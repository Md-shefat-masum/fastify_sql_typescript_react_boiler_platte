import { Model } from 'sequelize';
import db from '../models/db';
import { FastifyRequest } from 'fastify';

async function soft_delete(
    fastify_instance: any,
    req: FastifyRequest,
): Promise<{}> {
    let models = await db();
    let body = req.body as { [key: string]: any };

    let data = await models.User.findOne({
        where: {
            id: body.id,
        },
    });
    console.log({ data });

    if (data) {
        data.update({
            status: 0,
        });
        data.save();
        return data;
    } else {
        return {};
    }
}

export default soft_delete;
