import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

import Role from './Role';

const User = sequelize.define('User',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    role_id: {
        type: Sequelize.INTEGER,
        defaultValue: 2
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    }
},{
    timestamps: false,
    tableName: 'users'
});

User.belongsTo(Role, { foreignKey: 'role_id' });

export default User;