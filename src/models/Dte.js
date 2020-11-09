import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const Dte = sequelize.define('dtes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default Dte;