import Sequelize from 'sequelize'
import db from '../db'

const Kategori_Nilai = db.define('Kategori_Nilai', {
  parent: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  nama_kategori: {
    type: Sequelize.STRING,
  },
  id_perkuliahan: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nip: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey:true,
    autoIncrement: true
  },
  bobot_nilai: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps:false
})

export default Kategori_Nilai
