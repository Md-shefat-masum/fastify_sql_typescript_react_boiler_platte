import { FastifyInstance, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { Model } from 'sequelize';

export interface SupportPluginOptions {
    // Specify Support plugin options here
}

/**
 *
 * @param {Request} req
 * @param {Number} page
 * @param {Number} pageSize
 * @param {Sequelize} model
 * @param {Object} query
 * @returns
 */
async function getDataWithPagination(
    req: FastifyRequest,
    page: number,
    pageSize: number,
    model: Model,
    query: { [key: string]: any },
) {
    if (typeof page === 'string') {
        page = parseInt(page);
    }
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const users = await (model as any).findAndCountAll({
        offset,
        limit,
        where: {
            status: 1,
        },

        ...query,
    });

    const totalPages = Math.ceil(users.count / pageSize);
    // const baseUrl = req.protocol + '://' + req.hostname + req.url.split('?')[0];
    let url: string = req.url;
    url = url.replace('page=', 'oldpage=');
    const baseUrl = req.protocol + '://' + req.hostname + url;

    const response = {
        current_page: page,
        data: users.rows.map((user: { [key: string]: any }) => user),
        first_page_url: `${baseUrl}`,
        from: offset + 1,
        last_page: totalPages,
        last_page_url: `${baseUrl}&page=${totalPages}`,
        links: generatePaginationLinks(baseUrl, page, totalPages),
        next_page_url: page < totalPages ? `${baseUrl}&page=${page + 1}` : null,
        path: baseUrl,
        per_page: pageSize.toString(),
        prev_page_url: page > 1 ? `${baseUrl}&page=${page - 1}` : null,
        to: offset + users.rows.length,
        total: users.count,
    };

    return response;
}

/**
 *
 * @param {String} baseUrl
 * @param {Number} currentPage
 * @param {Number} totalPages
 * @returns
 */
function generatePaginationLinks(
    baseUrl: string,
    currentPage: number,
    totalPages: number,
) {
    const links = [];

    // Previous page link
    links.push({
        url: currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : null,
        label: "<i class='fa fa-angle-left'></i>",
        active: false,
    });

    // Page links
    for (let i = 1; i <= totalPages; i++) {
        links.push({
            url: `${baseUrl}?page=${i}`,
            label: i.toString(),
            active:
                i ===
                (typeof currentPage === 'string'
                    ? parseInt(currentPage)
                    : currentPage),
        });
    }

    // Next page link
    links.push({
        url:
            currentPage < totalPages
                ? `${baseUrl}?page=${currentPage + 1}`
                : null,
        label: "<i class='fa fa-angle-right'></i>",
        active: false,
    });

    return links;
}

module.exports.generatePaginationLinks = generatePaginationLinks;

/**
 * 
 * @param {Request} req 
 * @param {Number} page 
 * @param {Number} pageSize 
 * @param {Sequelize} model 
 * @param {Object} query 
 * @returns
 * ```js
    await paginate(req, 1, 10, User);
 */
const paginate = async (
    req: FastifyRequest,
    model: Model,
    pageSize: number = 10,
    query: { [key: string]: any } = {},
) => {
    if (model) {
        let response = await getDataWithPagination(
            req,
            (req.query as any).page || 1,
            pageSize,
            model,
            query,
        );
        return response;
    }

    return {};
};

// Example usage
// async function main(req) {
//     const page = 2;
//     const pageSize = 2;
//     const response = await getDataWithPagination(req, page, pageSize);
//     console.log(response);
// }

export default fp<SupportPluginOptions>(
    (fastify: FastifyInstance, opts = {}, done) => {
        fastify.decorate('paginate', paginate);
        done();
    },
);

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
    export interface FastifyInstance {
        paginate(
            req: FastifyRequest,
            model: Model,
            pageSize: number,
            query: {
                [key: string]: any;
            },
        ): object;
    }
}
