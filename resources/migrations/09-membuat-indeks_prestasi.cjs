'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Indeks_prestasi', {
      ip_semester: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true,
      },
      nim: {
		type: Sequelize.STRING,
        references:{
          model:'Mahasiswa',
          key:'nim',
        },
        onUpdate: 'cascade',
        onDelete: 'set null'      
      },
	  semester: {
        type: Sequelize.STRING,
        references:{
          model:'Mata_Kuliah',
          key:'semester',
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Indeks_prestasi');
  }
};
