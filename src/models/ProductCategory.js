import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

import Product from './Product';

const ProductCategory = sequelize.define('product_categories', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
}, {
    timestamps: false
});

ProductCategory.hasMany(Product, { foreignKey: 'product_category_id' });

export default ProductCategory;