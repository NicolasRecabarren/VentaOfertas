import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

import Order from './Order';

const OrderStep = sequelize.define('OrderStep', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'order_steps'
});

OrderStep.hasMany(Order, {foreignKey: 'order_step_id'} );

export default OrderStep;