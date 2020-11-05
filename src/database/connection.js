import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'venta_ofertas', // DB name
    'root', // username
    '', // password
    {
        host: 'localhost', // Database IP
        dialect: 'mysql',
        /*pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },*/
        logging: false
    }
)