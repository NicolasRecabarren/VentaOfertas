import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

import Product from './Product';

const ProductCategory = sequelize.define('ProductCategory', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    product_category_id: {
        type: Sequelize.INTEGER,
        allowNull: true
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
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'product_categories'
});

ProductCategory.hasMany(Product, { foreignKey: 'product_category_id' });

export default ProductCategory;