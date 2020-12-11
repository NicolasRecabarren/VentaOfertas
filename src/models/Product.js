import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const Product = sequelize.define('Product',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Código global del producto (SKU)
    sku: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    // Código interno del producto (código en la empresa)
    code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    tax: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    offer_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    offer_percentage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    product_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    brand_id: {
        type: Sequelize.INTEGER
    },
    stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    tableName: 'products'
});

export default Product;