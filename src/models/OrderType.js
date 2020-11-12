import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const OrderType = sequelize.define('OrderType', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'order_types'
});

export default OrderType;