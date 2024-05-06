import { FindAndCountOptions, Model } from 'sequelize';
import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import response from '../helpers/response';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../common_types/object';

async function login(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let body: anyObject = req.body as anyObject;

    try {
        let data: anyObject | null = {};
        if (body) {
            data = await models.User.findOne({
                where: {
                    email: body.email,
                },
            });
        }
        return response(200, 'data fetched', data || {});
    } catch (error) {
        return response(500, 'data fetching failed', { error });
    }
}

export default login;
