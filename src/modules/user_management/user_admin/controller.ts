'use strict'
import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import all from "./services/all"

export default {
    all: async function (req: FastifyRequest, res: FastifyReply) {

        // console.log(this);
        // (this as any).print('ok')
        let users = await all();
        res.code(200).send({ title: 'all', users });
    },

    find: async function (req: FastifyRequest, res: FastifyReply) {
        res.code(200).send({ title: 'find' });
    },

    store: async function (req: FastifyRequest, res: FastifyReply) {
        res.code(200).send(req.body);
    },

    update: async function (req: FastifyRequest, res: FastifyReply) {

    },

    soft_delete: async function (req: FastifyRequest, res: FastifyReply) {

    },

    restore: async function (req: FastifyRequest, res: FastifyReply) {

    },

    destroy: async function (req: FastifyRequest, res: FastifyReply) {

    },

    export: async function (req: FastifyRequest, res: FastifyReply) {

    },

    import: async function (req: FastifyRequest, res: FastifyReply) {

    },
}