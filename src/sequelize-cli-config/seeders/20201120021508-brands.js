'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('brands', [
      {name: 'Bozzo'},
      {name: 'Braesi'},
      {name: 'Brice'},
      {name: 'Casio'},
      {name: 'Cooler'},
      {name: 'Cooler Pro'},
      {name: 'Cousiño'},
      {name: 'Ecobeck'},
      {name: 'ESP'},
      {name: 'Europard'},
      {name: 'Fahostec'},
      {name: 'Infrico'},
      {name: 'Inoxchef'},
      {name: 'Lincat'},
      {name: 'Maigas'},
      {name: 'Med'},
      {name: 'Mimet'},
      {name: 'MBM'},
      {name: 'Maquipan'},
      {name: 'Metvisa'},
      {name: 'NS'},
      {name: 'Ozti'},
      {name: 'Sinmag'},
      {name: 'Star'},
      {name: 'Topgas'},
      {name: 'Unox'},
      {name: 'Ventus'}
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('brands', null, {});
  }
};
