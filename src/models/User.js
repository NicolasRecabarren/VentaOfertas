import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

import Role from './Role';

const User = sequelize.define('users',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING(255)
    },
    password: {
        type: Sequelize.STRING(255)
    },
    active: {
        type: Sequelize.BOOLEAN
    },
    role_id: {
        type: Sequelize.INTEGER
    }
},{
    //timestamps: false
});

User.belongsTo(Role, { foreignKey: 'role_id' });

export default User;