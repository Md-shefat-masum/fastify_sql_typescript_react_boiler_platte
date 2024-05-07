import { FindAndCountOptions, Model } from 'sequelize';
import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import response from '../helpers/response';
import { anyObject, responseObject } from '../../../common_types/object';

async function all(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let query_param = req.query as any;

    const { Op } = require('sequelize');
    let search_key = query_param.search_key;
    let orderByCol = query_param.orderByCol;
    let orderByAsc = query_param.orderByAsc;
    let show_active_data = query_param.show_active_data;
    let select_fields = query_param.select_fields.replace(/\s/g, '').split(',');

    let query: FindAndCountOptions = {
        attributes: [...select_fields, 'id', 'status'],
        order: [[orderByCol, orderByAsc == 'true' ? 'ASC' : 'DESC']],
        where: {
            status: show_active_data == 'true' ? 1 : 0,
        },
        // include: [models.Project],
    };

    if (search_key) {
        query.where = {
            ...query.where,
            [Op.or]: [
                { name: { [Op.like]: `%${search_key}%` } },
                { preferred_name: { [Op.like]: `%${search_key}%` } },
                { status: { [Op.like]: `%${search_key}%` } },
                { id: { [Op.like]: `%${search_key}%` } },
            ],
        };
    }

    let paginate = parseInt((req.query as any).paginate);

    try {
        let data = await (fastify_instance as anyObject).paginate(
            req,
            models.User,
            paginate,
            query,
        );
        return response(200, 'data fetched', data);
    } catch (error) {
        return response(500, 'data fetching failed', { error });
    }
}

export default all;
