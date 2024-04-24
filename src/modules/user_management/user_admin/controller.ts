'use strict';
import { FastifyReply, FastifyRequest } from 'fastify';
import all from './services/all';
import details from './services/details';
import soft_delete from './services/soft_delete';
import store from './services/store';

export default {
    all: async function (req: FastifyRequest, res: FastifyReply) {
        // console.log(this);
        let fastify_instance = this as any;
        let data = await all(fastify_instance, req);
        res.code(200).send(data);
    },

    find: async function (req: FastifyRequest, res: FastifyReply) {
        let fastify_instance = this as any;
        let data = await details(fastify_instance, req);
        res.code(200).send(data);
    },

    store: async function (req: FastifyRequest, res: FastifyReply) {
        let fastify_instance = this as any;
        let data = await store(fastify_instance, req);
        res.code(200).send(data);
    },

    update: async function (req: FastifyRequest, res: FastifyReply) {},

    soft_delete: async function (req: FastifyRequest, res: FastifyReply) {
        let fastify_instance = this as any;
        let data = await soft_delete(fastify_instance, req);
        res.code(200).send(data);
    },

    restore: async function (req: FastifyRequest, res: FastifyReply) {},

    destroy: async function (req: FastifyRequest, res: FastifyReply) {},

    export: async function (req: FastifyRequest, res: FastifyReply) {},

    import: async function (req: FastifyRequest, res: FastifyReply) {},
};
