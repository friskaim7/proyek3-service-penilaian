import Sequelize from 'sequelize'

import db from '../db'

const Nilai = db.define('Nilai', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  kode_kategori: {
    type: Sequelize.STRING,
    allowNull: false,
    references:{
      model:'Kategori_Nilai',
      key:'kode_kategori',
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },
  id_studi: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references:{
      model:'Studi',
      key:'id',
    },
    onUpdate: 'cascade',
    onDelete: 'set null'
  },
  nilai: {
    type: Sequelize.DOUBLE
  },
}, {
  timestamps: false
})

export default Nilai