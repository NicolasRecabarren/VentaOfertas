import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

import Role from './Role';

const User = sequelize.define('users',{
    id: {
        type: Sequelize.INTEGER,
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
    }
},{
    //timestamps: false
});

User.belongsTo(Role, { foreignKey: 'role_id' });

export default User;