'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Kategori_Nilai', {
      parent: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nama_kategori: {
        type: Sequelize.STRING,
      },
      id: {
        type: Sequelize.STRING,
        references:{
          model:'Mata_Kuliah',
          key:'id',
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
        primaryKey: true
      },
      id_kategori: {
        type: Sequelize.INTEGER,
        references:{
          model:'Kategori_Nilai',
          key:'id_kategori',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      nilai: {
        type: Sequelize.INTEGER
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Nilai');
    await queryInterface.dropTable('Kategori_Nilai');
  }
};
