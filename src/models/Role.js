import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const Role = sequelize.define('Role', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'roles',
    timestamps: false
});

export default Role;