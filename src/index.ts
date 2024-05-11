import Fastify, {
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
} from 'fastify';
import path from 'path';
import view from '@fastify/view';
import { sequelize } from './bootstrap/db.sql';
import custom_error from './modules/user_management/user_admin/helpers/custom_error';
import type { FastifyCookieOptions } from '@fastify/cookie';
import { app_config } from './configs/app.config';
import { Sequelize } from 'sequelize';

const AutoLoad = require('@fastify/autoload');
const underPressure = require('@fastify/under-pressure');
let sequelize_instance: any;
let appDir: string = path.resolve(path.dirname(__dirname));
let public_dir: string = path.resolve(appDir, 'public');
const fsp = require('fs').promises;

async function boot() {
    const fastify = Fastify({
        logger: true,
    });

    /** assets middleware */
    const commonMiddleware = async function (request: FastifyRequest) {
        const extension = path.extname(request.raw.url as string).toLowerCase();

        if (extension !== '') {
            if (
                [
                    '.ico',
                    '.jpg',
                    '.jpeg',
                    '.png',
                    '.gif',
                    '.svg',
                    '.mp4',
                    '.webm',
                    '.pdf',
                    '.css',
                    '.js',
                    '.ttf',
                    '.woff',
                    '.woff2',
                ].includes(extension)
            ) {
                return;
            } else {
                throw new custom_error('not found', 404, 'target not found.');
            }
        }
        return;
    };

    /** conver input files into buffer string */
    async function onFile(part: any) {
        console.log({ part });
        if (part.type == 'file') {
            const buff = await part.toBuffer();
            part.value = {};
            if (part.filename) {
                part.value = {
                    data: await Buffer.from(buff, 'base64'),
                    name: part.filename,
                    ext: '.' + part.filename.split('.')[1],
                };
            }
        }
    }

    fastify.register(require('@fastify/multipart'), {
        attachFieldsToBody: 'keyValues',
        onFile,
        limits: {
            fileSize: 6000000 * 10,
        },
    });
    /** find all module routes */
    async function findAllRoutesFiles(dir: any) {
        let results: any = [];
        async function recursiveSearch(currentPath: any) {
            const entries = await fsp.readdir(currentPath, {
                withFileTypes: true,
            });
            for (let entry of entries) {
                const fullPath = path.join(currentPath, entry.name);
                if (entry.isDirectory()) {
                    await recursiveSearch(fullPath);
                } else if (entry.name === 'routes.ts') {
                    results.push(fullPath);
                }
            }
        }
        await recursiveSearch(dir);
        return results;
    }

    /** register routes */
    await findAllRoutesFiles('./src/modules')
        .then((files: string[]) => {
            files.forEach((routes: string) => {
                fastify.register(require(path.resolve(appDir, routes)), {
                    prefix: 'api/v1',
                });
            });
        })
        .catch((err) => {
            console.error('Error searching for route files:', err);
        });

    /** register all dependencies */
    fastify
        .register(AutoLoad, {
            dir: path.join(__dirname, 'plugins'),
        })
        .register(AutoLoad, {
            dir: path.join(__dirname, 'routes'),
        })
        .register(require('@fastify/cookie'), {
            secret: 'fast#2$4@4!cokie02ms',
            hook: 'onRequest',
            parseOptions: {
                httpOnly: true,
                secure: true,
            },
        } as FastifyCookieOptions)
        .register(underPressure, {
            maxEventLoopDelay: 1000,
            maxHeapUsedBytes: 1000000000000,
            maxRssBytes: 1000000000000,
            maxEventLoopUtilization: 0.98,
            message: 'Under pressure!',
            retryAfter: 50,
            pressureHandler: (
                req: FastifyRequest,
                rep: FastifyReply,
                type: string,
                value: string,
            ) => {
                if (type === underPressure.TYPE_HEAP_USED_BYTES) {
                    fastify.log.warn(`too many heap bytes used: ${value}`);
                } else if (type === underPressure.TYPE_RSS_BYTES) {
                    fastify.log.warn(`too many rss bytes used: ${value}`);
                }
                // rep.send('out of memory')
            },
        })
        .register(require('@fastify/static'), {
            root: public_dir,
            prefix: '/',
        });

    fastify.register(view, {
        engine: {
            ejs: require('ejs'),
        },
        root: path.join(public_dir, 'views'),
    });

    fastify
        .setNotFoundHandler(function (req: FastifyRequest, res: FastifyReply) {
            (fastify as any).set_log('404', {}, res, req);
        })
        .setErrorHandler(async (error, req, res) => {
            console.log(error);
            (fastify as any).set_log('500', error, res, req);
        })
        .addHook('onRequest', commonMiddleware as any)
        .addHook('onRequest', async (request, reply) => {
            console.log('-------------');
            console.log('');

            request.raw.on('close', () => {
                console.log('sequelize instance closed');
                sequelize_instance.close();

                console.log('');
                console.log('-------------');
            });
        });

    try {
        fastify.listen({ port: app_config.port }).then(() => {
            console.log(
                'Server is running on http://127.0.0.1:' + app_config.port,
            );
            console.log(fastify.addresses());
        });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

sequelize().then((res: any = {}) => {
    sequelize_instance = res.sequelize;
    boot();
});

/** docker test */
require('dotenv').config();
async function connectToDatabase() {
    try {
        let db = process.env.DB_DATABASE || '';
        let user = process.env.DB_USER || '';
        let pass = process.env.DB_PASSWORD || '';
        let host = process.env.DB_HOST || '';
        let port = process.env.DB_PORT || '';

        const sequelize: Sequelize = new Sequelize(db, user, pass, {
            host,
            dialect: 'mysql',
            port: parseInt(port),
            dialectOptions: {
                // Your mysql2 options here
            },
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        });

        // Verify database connection
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        // Return the Sequelize instance for further use
        return sequelize;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        // Handle error appropriately
        throw error;
    }
}

// Call the function to establish the database connection
// connectToDatabase()
//     .then((sequelize) => {
//         // Do something with the Sequelize instance
//         const query = `
//             SELECT * FROM users
//         `;
//         sequelize
//             .query(query)
//             .then((databases) => {
//                 console.log(databases);
//             })
//             .catch((error) => {
//                 console.error('Error fetching databases:', error);
//             });
//         console.log('ok');
//     })
//     .catch((error) => {
//         // Handle error
//         console.log('error in connection');
//     });

async function test() {
    let mysql = require('mysql2/promise');
    // Create the connection to database
    require('dotenv').config();

    // A simple SELECT query
    console.log(process.env);

    // const pool = await mysql.createPool({
    //     host: process.env.DB_HOST,
    //     user: process.env.DB_USER,
    //     password: process.env.DB_PASSWORD,
    //     database: 'patientsdb',
    //     port: 3306 || process.env.DB_PORT,
    //     connectionLimit: 10 || process.env.DB_CONNECTION_LIMIT,
    // });

    // const r = await pool.query(
    //     'SELECT * FROM patients ORDER BY created_at DESC LIMIT 50',
    // );
    // console.log(r);
}

// test();
