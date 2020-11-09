import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

import Order from './Order';

const OrderStep = sequelize.define('order_steps', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
});

OrderStep.hasMany(Order, {foreignKey: 'order_step_id'} );

export default OrderStep;