'use strict';
import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import { sequelize, sequelize_response } from '../../../bootstrap/db.sql';

export default {
    all: async function (req: FastifyRequest, res: FastifyReply) {
        let users;

        // let dbs: sequelize_response;
        // dbs = await sequelize();
        // users = await (dbs.db['user_admin'] as any).findAll();

        res.code(200).send({ title: 'all', users });
        // console.log(users);
    },
    find: async function (req: FastifyRequest, res: FastifyReply) {
        res.code(200).send({ title: 'find' });
    },
    store: async function (req: FastifyRequest, res: FastifyReply) {
        res.code(200).send(req.body);
    },
    update: async function (req: FastifyRequest, res: FastifyReply) {},
    soft_delete: async function (req: FastifyRequest, res: FastifyReply) {},
    restore: async function (req: FastifyRequest, res: FastifyReply) {},
    destroy: async function (req: FastifyRequest, res: FastifyReply) {},
    export: async function (req: FastifyRequest, res: FastifyReply) {},
    import: async function (req: FastifyRequest, res: FastifyReply) {},
};
