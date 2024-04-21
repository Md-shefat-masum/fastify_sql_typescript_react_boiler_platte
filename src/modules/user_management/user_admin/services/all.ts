import { Model } from 'sequelize';
import db from '../models/db';

async function all(): Promise<Model[]> {
    let models = await db();
    let users = await models.User.findAll();
    return users;
}

export default all;
