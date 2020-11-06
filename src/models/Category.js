import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const Category = sequelize.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100)
    }
});

export default Category;