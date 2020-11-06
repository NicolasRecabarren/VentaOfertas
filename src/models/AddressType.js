import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const AddressType = sequelize.define('address_types', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(30)
    }
},{
    // Con esto evitamos que cree las columnas createdAt y updatedAt al realizar las migraciones.
    timestamps: false
});

export default AddressType;