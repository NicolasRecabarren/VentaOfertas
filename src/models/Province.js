import { SqlError } from 'mariadb';
import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

import State from './State';

const Province = sequelize.define('provinces', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    state_id: {
        type: Sequelize.INTEGER
    }
},{
    // Con esto evitamos que cree las columnas createdAt y updatedAt al realizar las migraciones.
    timestamps: false
});

Province.belongsTo(State, { foreignKey: 'state_id' });

export default Province;