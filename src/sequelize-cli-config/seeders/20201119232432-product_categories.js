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
    await queryInterface.bulkInsert('product_categories', [
      {id: 1 , name: 'Gastronomía'},
      {id: 2 , name: 'Calor'},
      {id: 3 , name: 'Refrigeración'},
      {id: 4 , name: 'Acero Inoxidable'},
      {id: 5 , name: 'Lavado'},
      {id: 6 , name: 'Microcromados'},
      {id: 7 , name: 'Depósitos y tapas gn'},
      {id: 8 , name: 'Peluquería'},
      {id: 9 , name: 'Industria'},
      {id: 10 , name: 'Médicos'},
      {id: 11, name: 'Gastronomía'        , product_category_id: 1},
      {id: 12, name: 'Accesorios'         , product_category_id: 1},
      {id: 13, name: 'Bandejas de horno'  , product_category_id: 1},
      {id: 14, name: 'Equipos de calor'   , product_category_id: 1},
      {id: 15, name: 'Licuadoras'         , product_category_id: 1},
      {id: 16, name: 'Extractor de jugo'  , product_category_id: 1},
      {id: 17, name: 'Panadería'          , product_category_id: 1},
      {id: 18, name: 'Selladoras'         , product_category_id: 1},
      {id: 19, name: 'Insumos'            , product_category_id: 1},
      {id: 20, name: 'Sillas y mesas'     , product_category_id: 1},
      {id: 21, name: 'Accesorios'         , product_category_id: 2},
      {id: 22, name: 'Equipos de calor'   , product_category_id: 2},
      {id: 23, name: 'Gastronomía'        , product_category_id: 2},
      {id: 24, name: 'Vitrinas de calor'  , product_category_id: 2},
      {id: 25, name: 'Bases refrigeradas' , product_category_id: 3},
      {id: 26, name: 'Congeladores / Refrigeradores', product_category_id: 3},
      {id: 27, name: 'Frentes / Mostradores', product_category_id: 3},
      {id: 28, name: 'Máquinas de hielo'    , product_category_id: 3},
      {id: 29, name: 'Mesones congeladores' , product_category_id: 3},
      {id: 30, name: 'Mesones refrigerados' , product_category_id: 3},
      {id: 31, name: 'Vitrinas refrigeradas', product_category_id: 3},
      {id: 32, name: 'Accesorios'           , product_category_id: 4},
      {id: 33, name: 'Basureros'            , product_category_id: 4},
      {id: 34, name: 'Campanas'             , product_category_id: 4},
      {id: 35, name: 'Carros bandejeros'    , product_category_id: 4},
      {id: 36, name: 'Carros de apoyo'      , product_category_id: 4},
      {id: 37, name: 'Estantes'             , product_category_id: 4},
      {id: 38, name: 'Lavafondos'           , product_category_id: 4},
      {id: 39, name: 'Lavamanos'            , product_category_id: 4},
      {id: 40, name: 'Llaves'               , product_category_id: 4},
      {id: 41, name: 'Mesones'              , product_category_id: 4},
      {id: 42, name: 'Mesones cerrados'     , product_category_id: 4},
      {id: 43, name: 'Mesones línea ECO'    , product_category_id: 4},
      {id: 44, name: 'Mesones línea especiales', product_category_id: 4},
      {id: 45, name: 'Repisas'              , product_category_id: 4},
      {id: 46, name: 'Lavacopas'            , product_category_id: 5},
      {id: 47, name: 'Lavavajillas'         , product_category_id: 5},
      {id: 48, name: 'Carros de apoyo'      , product_category_id: 6},
      {id: 49, name: 'Microcromados'        , product_category_id: 6},
      {id: 50, name: 'Depósitos y tapas'    , product_category_id: 7},
      {id: 51, name: 'Peluquería'           , product_category_id: 8},
      {id: 52, name: 'Apiladores'           , product_category_id: 9},
      {id: 53, name: 'Energía'              , product_category_id: 9},
      {id: 54, name: 'Escalas'              , product_category_id: 9},
      {id: 55, name: 'Espejos'              , product_category_id: 9},
      {id: 56, name: 'Artículos médicos'    , product_category_id:10}
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('product_categories', null, {});
  }
};
