import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

//import State from './State';

const Province = sequelize.define('Province', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
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
    timestamps: false,
    tableName: 'provinces'
});

//Province.belongsTo(State, { foreignKey: 'state_id' });

export default Province;