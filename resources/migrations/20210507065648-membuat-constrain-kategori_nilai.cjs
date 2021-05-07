'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addcolumn(
      'Kategori_nilai', 
      'parent',
      {
        type: Sequelize.INTEGER,
        references:{
          
        },
        allowNull: false,
        primaryKey: true
      ,

    });
  },

  down: async (queryInterface, Sequelize) => {

  }
};
