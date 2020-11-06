import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

import AddressType from './AddressType';
import Customer from './Customer';
import District from './District';

const Address = sequelize.define('addresses', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    street: {
        type: Sequelize.STRING
    },
    number: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    address_type_id: {
        type: Sequelize.INTEGER
    },
    customer_id: {
        type: Sequelize.INTEGER
    },
    district_id: {
        type: Sequelize.INTEGER
    }
});

Address.belongsTo(AddressType, { foreignKey: 'address_type_id' });
Address.belongsTo(Customer, { foreignKey: 'customer_id' });
Address.belongsTo(District, { foreignKey: 'district_id' });

export default Address;