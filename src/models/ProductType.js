import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const ProductType = sequelize.define('ProductType', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(255)
    }
},{
    // Con esto evitamos que cree las columnas createdAt y updatedAt al realizar las migraciones.
    timestamps: false,
    tableName: 'product_types'
});

export default ProductType;