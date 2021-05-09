'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Kategori_Nilai', {
      parent: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nama_kategori: {
        type: Sequelize.STRING,
      },
      id_mata_kuliah: {
        type: Sequelize.INTEGER,
        references:{
          model:'Mata_Kuliah',
          key:'id_mata_kuliah',
        },
        allowNull: false,
      },
      id_kategori: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bobot_nilai: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    await queryInterface.createTable('Nilai', {
      id_nilai: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      id_kategori: {
        type: Sequelize.INTEGER,
        references:{
          model:'Kategori_Nilai',
          key:'id_kategori',
        }
      },
      nilai: {
        type: Sequelize.INTEGER
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Kategori_Nilai');
    await queryInterface.dropTable('Nilai');
  }
};