import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const ProductType = sequelize.define('product_types', {
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
    timestamps: false
});

export default ProductType;