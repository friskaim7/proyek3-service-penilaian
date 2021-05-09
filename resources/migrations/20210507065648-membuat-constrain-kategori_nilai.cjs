'use strict';

const { UniqueConstraintError } = require("sequelize/types");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryIntereface.addconstraint('Kategori_Nilai',{
      fields: ['parent','nama_kategoti','id_mata_kuliah'],
      type: 'Unique',
      name: 'c_unique0_kategori_nilai'      
  })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Kategori_Nilai','c_unique0_kategori_nilai')
  }
};
