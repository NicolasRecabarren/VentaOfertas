import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const PaymentMethod = sequelize.define('payment_methods', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    api_key: {
        type: Sequelize.STRING
    }
});

export default PaymentMethod;