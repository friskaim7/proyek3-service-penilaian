'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Nilai', 
      'nim', {
        type: Sequelize.STRING(15),
        allowNull: false,
        reference: {
          model: 'Mahasiswa',
          key: 'nim'
        },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Nilai', 'nim');
  }
};
