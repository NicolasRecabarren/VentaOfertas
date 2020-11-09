import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

import Address from './Address';

const AddressType = sequelize.define('address_types', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false
    }
},{
    // Con esto evitamos que cree las columnas createdAt y updatedAt al realizar las migraciones.
    timestamps: false
});

AddressType.hasMany(Address, {foreignKey: 'address_type_id'} );

export default AddressType;