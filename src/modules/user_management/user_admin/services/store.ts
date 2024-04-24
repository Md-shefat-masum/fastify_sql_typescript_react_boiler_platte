import { Model } from 'sequelize';
import db from '../models/db';
import { FastifyRequest } from 'fastify';

async function store(fastify_instance: any, req: FastifyRequest): Promise<{}> {
    let models = await db();
    let body = req.body as { [key: string]: string };

    let data: { [key: string]: any } = await models.User.create({
        name: body.name,
        preferred_name: body.preferred_name,
    });
    console.log({ data });

    if (data) {
        return data;
    } else {
        return {};
    }
}

export default store;
