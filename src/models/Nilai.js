import Sequelize from 'sequelize'

import db from '../db'

const Studi = db.define('Nilai', {
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
})

export default Nilai
