import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const Order = sequelize.define('orders',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    total_price: {
        type: Sequelize.INTEGER
    },
    total_discount: {
        type: Sequelize.INTEGER
    },
    customer_id: {
        type: Sequelize.INTEGER
    }
},{
    //timestamps: false
});

export default Order;