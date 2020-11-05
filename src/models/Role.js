import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const Role = sequelize.define('roles', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(20)
    }
});

export default Role;