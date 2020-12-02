//require('dotenv').config();

import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'sql10379644', // DB name
    'sql10379644', // username
    'HQADfBf3I4', // password
    {
        host: 'sql10.freemysqlhosting.net', // Database IP
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

/*async function connect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connect();*/