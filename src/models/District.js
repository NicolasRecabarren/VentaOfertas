import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

import Province from './Province';

const District = sequelize.define('districts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    province_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    // Con esto evitamos que cree las columnas createdAt y updatedAt al realizar las migraciones.
    timestamps: false
});

District.belongsTo(Province, {foreignKey: 'province_id'} );

export default District;