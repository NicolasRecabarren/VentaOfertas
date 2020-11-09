import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

import ProductCategory from './ProductCategory';

const Product = sequelize.define('products',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
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
    }
});

Product.belongsTo(ProductCategory, { foreignKey: 'product_category_id' });

export default Product;