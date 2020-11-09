import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

import Address from './Address';
import Order from './Order';
import User from './User';

const Customer = sequelize.define('customers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    rut: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Customer.belongsTo(User, { foreignKey: 'user_id' });
Customer.hasMany(Address, { foreignKey: 'customer_id' });
Customer.hasMany(Order, { foreignKey: 'customer_id' });

export default Customer;