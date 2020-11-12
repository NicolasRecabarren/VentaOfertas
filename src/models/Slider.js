import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const Slider = sequelize.define('Slider',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING(255)
    },
    subtitle: {
        type: Sequelize.STRING(255)
    },
    body: {
        type: Sequelize.STRING(255)
    },
    link: {
        type: Sequelize.STRING(255)
    }
},{
    timestamps: false,
    tableName: 'sliders'
});

export default Slider;