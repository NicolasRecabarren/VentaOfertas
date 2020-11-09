'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('states', [
      {id: 1 , name: 'Arica y Parinacota'},
      {id: 2 , name: 'Tarapacá'},
      {id: 3 , name: 'Antofagasta'},
      {id: 4 , name: 'Atacama'},
      {id: 5 , name: 'Coquimbo'},
      {id: 6 , name: 'Valparaíso'},
      {id: 7 , name: 'Metropolitana de Santiago'},
      {id: 8 , name: 'Libertador G. Bernardo O\'higgins'},
      {id: 9 , name: 'Maule'},
      {id: 10, name: 'Ñuble'},
      {id: 11, name: 'Biobío'},
      {id: 12, name: 'La Araucanía'},
      {id: 13, name: 'Los Ríos'},
      {id: 14, name: 'Los Lagos'},
      {id: 15, name: 'Aysén'},
      {id: 16, name: 'Magallanes y la Antártida Chilena'},
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('states', null, {});
  }
};
