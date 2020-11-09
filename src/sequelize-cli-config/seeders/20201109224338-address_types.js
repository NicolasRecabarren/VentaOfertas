'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('address_types', [
      {id: 1, name: 'Envío'},
      {id: 2, name: 'Facturación'}
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('address_types', null, {});
  }
};
