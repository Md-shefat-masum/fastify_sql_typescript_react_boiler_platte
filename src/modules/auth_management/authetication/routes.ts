'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/auth';
    const controllerInstance = controller(fastify);

    fastify
        .post(`${prefix}/login`, controllerInstance.login)
        .post(`${prefix}/register`, controllerInstance.register)
        .post(`${prefix}/forget`, controllerInstance.forget);
};
