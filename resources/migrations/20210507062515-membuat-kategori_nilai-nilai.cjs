'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Kategori_nilai', {
      parent: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nama_kategori: {
        type: Sequelize.STRING,
      },
      id_mata_kuliah: {
        type: Sequelize.STRING,
        references:{
          model:'Mata_kuliah',
          key:'id_matakuliah',
        },
        allowNull: false,
      },
      id_kategori: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
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
        references:{
          model:"Mahasiswa",
          key:"id_nilai",
        },
        primaryKey: true
      },
      id_kategori: {
        type: Sequelize.INTEGER,
        references:{
          model:'Kategori_nilai',
          key:'id_Kategori',
        }
      },
      nilai: {
        type: Sequelize.INTEGER
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Kategori_nilai');
    await queryInterface.dropTable('Nilai');
  }
};
