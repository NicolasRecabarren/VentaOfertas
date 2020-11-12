import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const State = sequelize.define('State',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'states'
});

export default State;