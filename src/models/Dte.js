import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const Dte = sequelize.define('Dte', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'dtes'
});

export default Dte;