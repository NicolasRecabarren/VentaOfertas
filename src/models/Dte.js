import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const Dte = sequelize.define('dtes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    order_id: {
        type: Sequelize.INTEGER
    }
});

export default Dte;