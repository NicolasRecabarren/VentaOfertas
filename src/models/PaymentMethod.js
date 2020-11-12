import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const PaymentMethod = sequelize.define('PaymentMethod', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    api_key: {
        type: Sequelize.STRING
    }
},{
    timestamps: false,
    tableName: 'payment_methods'
});

export default PaymentMethod;