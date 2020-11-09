import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const State = sequelize.define('states',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
},{
    // Con esto evitamos que cree las columnas createdAt y updatedAt al realizar las migraciones.
    timestamps: false
});

export default State;