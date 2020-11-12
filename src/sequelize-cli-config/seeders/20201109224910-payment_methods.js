'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('payment_methods', [
      {id: 1, name: 'Transferencia o depósito'   },
      {id: 2, name: 'Tarjeta de crédito o débito'}
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('payment_methods', null, {});
  }
};
