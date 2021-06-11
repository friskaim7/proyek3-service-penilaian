import Sequelize from 'sequelize'

import db from '../db'

const Nilai = db.define('Nilai', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  id_kategori: {
    type: Sequelize.INTEGER,
    // references:{
    //   model:'Kategori_Nilai',
    //   key:'id_kategori',
    // }
  },
  nilai: {
    type: Sequelize.INTEGER
  },
  nim: {
    type: Sequelize.STRING,
    // references:{
    //   model:'Mahasiswa',
    //   key:'nim',
    // }
  }
}, {
  timestamps: false
})

export default Nilai
