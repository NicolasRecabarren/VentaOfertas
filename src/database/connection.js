require('dotenv').config();

import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    process.env.DB_NAME, // DB name
    process.env.DB_USERNAME, // username
    process.env.DB_PASSWORD, // password
    {
        host: process.env.DB_HOST, // Database IP
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