import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';


const Product = sequelize.define('products',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(255)
    },
    description: {
        type: Sequelize.STRING(255)
    },
    sku: { //piko idea ke es
        type: Sequelize.BOOLEAN 
    },
    code: {
        type: Sequelize.INTEGER
    }
},{
    //timestamps: false
});


export default User;