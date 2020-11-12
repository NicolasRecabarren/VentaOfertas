'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('order_steps', [
      {id: 1, name: 'En realización'         },
      {id: 2, name: 'Pendiente de aprobación'},
      {id: 3, name: 'Preparando envío'       },
      {id: 4, name: 'Enviado'                },
      {id: 5, name: 'Entregado'              }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('order_steps', null, {});
  }
};
