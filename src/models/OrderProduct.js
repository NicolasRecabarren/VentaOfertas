import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

/*import Order from './Order';
import Product from './Product';*/

const OrderProduct = sequelize.define('OrderProduct',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    total_price: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    total_discount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    // Producto asociado
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    // Orden / Pedido asociado
    order_id: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    }
},{
    timestamps: false,
    tableName: 'order_products'
});

/*OrderProduct.belongsTo(Product, { foreignKey: 'product_id' });
OrderProduct.belongsTo(Order, { foreignKey: 'order_id' });*/

export default OrderProduct;