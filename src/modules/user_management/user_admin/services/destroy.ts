import { Model } from 'sequelize';
import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { responseObject } from '../../../common_types/object';
import response from '../helpers/response';
import error_trace from '../helpers/error_trace';
import custom_error from '../helpers/custom_error';

async function destroy(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let body = req.body as { [key: string]: any };

    try {
        let data = await models.User.findOne({
            where: {
                id: body.id,
            },
        });

        if (data) {
            await data.destroy();
            return response(200, 'data deleted', data);
        } else {
            throw new custom_error('Forbidden', 403, 'operation not possible');
        }
    } catch (error: any) {
        let uid = await error_trace(models, error, req.url, req.body);
        if (error instanceof custom_error) {
            error.uid = uid;
        } else {
            throw new custom_error('server error', 500, error.message, uid);
        }
        throw error;
    }
}

export default destroy;
