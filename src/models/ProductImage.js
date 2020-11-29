import Sequelize from 'sequelize';
import {sequelize} from '../database/connection';

const ProductImage = sequelize.define('ProductImage', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    image: {
        type: Sequelize.TEXT
    },
    url: {
        type: Sequelize.TEXT
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'product_images'
});

export default ProductImage;