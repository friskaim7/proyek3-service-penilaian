import Sequelize from 'sequelize'

import db from '../db'

const indeks_prestasi = db.define('Indeks Prestasi', {
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
})

export default Kelas
