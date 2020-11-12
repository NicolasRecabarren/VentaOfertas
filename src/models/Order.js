import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

import Customer from './Customer';
import Dte from './Dte';
import OrderProduct from './OrderProduct';
import OrderStep from './OrderStep';
import OrderType from './OrderType';
import PaymentMethod from './PaymentMethod';

const Order = sequelize.define('Order',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    total_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_discounts: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    shipping_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_to_pay: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    order_step_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    order_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    payment_method_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    }
},{
    timestamps: false,
    tableName: 'orders'
});

Order.belongsTo( Customer , {foreignKey: 'customer_id'  });
Order.belongsTo( OrderType, {foreignKey: 'order_type_id'});
Order.belongsTo( OrderStep, {foreignKey: 'order_step_id'});
Order.belongsTo( PaymentMethod, {foreignKey: 'payment_method_id' });
Order.hasOne( Dte, {foreignKey: 'order_id', sourceKey: 'id' });
Order.hasMany(OrderProduct, {foreignKey: 'order_id' });

export default Order;