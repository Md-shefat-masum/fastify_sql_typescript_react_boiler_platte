'use strict';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import controller from './controller';
import check_auth from './services/check_auth';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/auth';
    const controllerInstance = controller(fastify);

    /** public routes */
    fastify.register(
        async (route, opts) => {
            route
                .post(`/login`, controllerInstance.login)
                .post(`/register`, controllerInstance.register)
                .post(`/forget`, controllerInstance.forget);
        },
        { prefix },
    );

    /** auth routes */
    fastify.register(
        async (route, opts) => {
            route
                .addHook('preHandler', check_auth)
                .get(
                    `/info`,
                    { preHandler: check_auth },
                    controllerInstance.auth_user,
                );
        },
        { prefix },
    );
};
