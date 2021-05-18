import Sequelize from 'sequelize'
import db from '../db'

const Kategori_Nilai = db.define('Kategori_Nilai', {
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
    primaryKey:true
  },
  bobot_nilai: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

export default Kategori_Nilai
