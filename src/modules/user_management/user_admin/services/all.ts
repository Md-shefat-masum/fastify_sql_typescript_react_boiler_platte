import { Model } from 'sequelize';
import db from '../models/db';
import { FastifyRequest } from 'fastify';

async function all(
    fastify_instance: any,
    req: FastifyRequest,
): Promise<Model[]> {
    let models = await db();
    let query_param = req.query as any;

    const { Op } = require('sequelize');
    let search_key = query_param.search_key;
    let query: { [key: string]: any } = {
        order: [['id', 'DESC']],
    };

    if (search_key) {
        query.where = {
            [Op.or]: [
                { name: { [Op.like]: `%${search_key}%` } },
                { preferred_name: { [Op.like]: `%${search_key}%` } },
                { status: { [Op.like]: `%${search_key}%` } },
                { id: { [Op.like]: `%${search_key}%` } },
            ],
        };
    }

    let paginate = parseInt((req.query as any).paginate);

    let data = await fastify_instance.paginate(
        req,
        models.User,
        paginate,
        query,
    );

    return data;
}

export default all;
