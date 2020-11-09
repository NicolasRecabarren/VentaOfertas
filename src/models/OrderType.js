import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const OrderType = sequelize.define('order_types', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
});

export default OrderType;