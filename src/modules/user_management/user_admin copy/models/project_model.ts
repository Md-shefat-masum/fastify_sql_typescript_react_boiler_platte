import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey,
} from 'sequelize';
import { DataModel as UserModel } from '../../user_admin/models/user_model';

const table_name = 'project_models';
const model_name = 'ProjectModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;

class DataModel extends Model<Infer, InferCreation> {

    declare id: CreationOptional<number>;
    declare title: string;
    declare user_id: ForeignKey<UserModel['id']>;

    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
}

function init(sequelize: Sequelize) {

    DataModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: new DataTypes.STRING(128),
                allowNull: false
            },
            user_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: table_name,
            modelName: model_name,
            sequelize,
            underscored: true,
        }
    );

    return DataModel;
}

export {
    init,
    DataModel,
}

