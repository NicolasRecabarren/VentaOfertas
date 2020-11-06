import Sequelize from 'sequelize';
import { sequelize } from '../database/connection';

const Slider = sequelize.define('sliders',{
    id: {
        type: Sequelize.INTEGER,
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
    //timestamps: false
});

export default Slider;