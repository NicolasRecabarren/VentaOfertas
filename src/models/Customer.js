import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';


const Customer = sequelize.define('customers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    rut: {
        type: Sequelize.STRING(10)
    },
    name: {
        type: Sequelize.STRING(50)
    },
    last_name: {
        type: Sequelize.STRING(50)
    }
});

export default Customer;