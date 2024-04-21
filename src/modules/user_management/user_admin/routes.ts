'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/admin-users';

    fastify
        .get(`${prefix}`, controller.all)
        .get(`${prefix}/:id`, controller.find)
        .post(`${prefix}/store`, controller.store)
        .post(`${prefix}/update`, controller.update)
        .post(`${prefix}/soft-delete`, controller.soft_delete)
        .post(`${prefix}/restore`, controller.restore)
        .post(`${prefix}/destroy`, controller.destroy)
        .post(`${prefix}/import`, controller.import);
};
