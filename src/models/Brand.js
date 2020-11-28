import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const Brand = sequelize.define('Brand', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'brands'
});

export default Brand;