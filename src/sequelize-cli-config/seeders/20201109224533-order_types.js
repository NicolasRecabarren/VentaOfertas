'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('order_types', [
      {id: 1, name: 'Cotización'},
      {id: 2, name: 'Venta'}
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('order_types', null, {});
  }
};
