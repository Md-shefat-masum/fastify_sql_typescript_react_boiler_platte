import { Model } from 'sequelize';
import db from '../models/db';
import { FastifyRequest } from 'fastify';

async function details(
    fastify_instance: any,
    req: FastifyRequest,
): Promise<{}> {
    let models = await db();
    let params = req.params as any;

    let data = await models.User.findOne({
        where: {
            id: params.id,
        },
    });
    if (data) {
        return data;
    } else {
        return {};
    }
}

export default details;
