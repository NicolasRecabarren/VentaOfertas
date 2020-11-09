'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('provinces', [
      {name: 'Arica'          , state_id: 1},
      {name: 'Parinacota'     , state_id: 1},
      {name: 'El Tamarugal'   , state_id: 2},
      {name: 'Iquique'        , state_id: 2},
      {name: 'Antofagasta'    , state_id: 3},
      {name: 'El Loa'         , state_id: 3},
      {name: 'Tocopilla'      , state_id: 3},
      {name: 'Chañaral'       , state_id: 4},
      {name: 'Copiapó'        , state_id: 4},
      {name: 'Huasco'         , state_id: 4},
      {name: 'Elqui'          , state_id: 5},
      {name: 'Limarí'         , state_id: 5},
      {name: 'Choapa'         , state_id: 5},
      {name: 'Isla de Pascua' , state_id: 6},
      {name: 'Los Andes'      , state_id: 6},
      {name: 'Petorca'        , state_id: 6},
      {name: 'Quillota'       , state_id: 6},
      {name: 'San Antonio'    , state_id: 6},
      {name: 'San Felipe de Aconcagua' , state_id: 6},
      {name: 'Marga Marga'    , state_id: 6},
      {name: 'Valparaíso'     , state_id: 6},
      {name: 'Chacabuco'      , state_id: 7},
      {name: 'Cordillera'     , state_id: 7},
      {name: 'Maipo'          , state_id: 7},
      {name: 'Melipilla'      , state_id: 7},
      {name: 'Santiago'       , state_id: 7},
      {name: 'Talagante'      , state_id: 7},
      {name: 'Cachapoal'      , state_id: 8},
      {name: 'Cardenal Caro'  , state_id: 8},
      {name: 'Colchagua'      , state_id: 8},
      {name: 'Cauquenes'      , state_id: 9},
      {name: 'Curicó'         , state_id: 9},
      {name: 'Linares'        , state_id: 9},
      {name: 'Talca'          , state_id: 9},
      {name: 'Diguillín'      , state_id: 10},
      {name: 'Punilla'        , state_id: 10},
      {name: 'Itata'          , state_id: 10},
      {name: 'Arauco'         , state_id: 11},
      {name: 'Biobío'         , state_id: 11},
      {name: 'Concepción'     , state_id: 11},
      {name: 'Cautín'         , state_id: 12},
      {name: 'Malleco'        , state_id: 12},
      {name: 'Valdivia'       , state_id: 13},
      {name: 'Ranco'          , state_id: 13}
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('provinces', null, {});
  }
};