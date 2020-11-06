import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const Detail = sequelize.define('details',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    total_price: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.DATE
    },
    product_id: {
        type: Sequelize.INTEGER
    },
    order_id: {
        type: Sequelize.INTEGER
    },
},{
    //timestamps: false
});

export default Detail;