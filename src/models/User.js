import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

jkjkjkjk

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
    },
    created_at: {
        type: Sequelize.DATE
    }
},{
    //timestamps: false
});

export default User;