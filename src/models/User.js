import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';
import bcrypt from 'bcrypt';

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
        allowNull: true,
        defaultValue: null
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
    tableName: 'users',
    hooks: {
        beforeCreate: async (user, options) => {
            user.password = await user.hashPassword(user.password);
        },
        beforeUpdate: async (user, options) => {
            if(user.password != ''){
                user.password = await user.hashPassword(user.password);
            } else {
                delete user.dataValues.password;
            }
        }
    }
});

User.prototype.hashPassword = async (password) => {
    return await bcrypt.hash(password, bcrypt.genSaltSync(10));
};

User.getUserByUsername = async (username) => {
    return await User.findOne({where: {username}});
};

export default User;