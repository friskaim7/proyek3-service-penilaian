import db from '../db'
import Sequelize from 'sequelize'


const Pengajar = db.define('Pengajar', {
    nip: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references:{
          model:'Dosen',
          key:'nip',
        }
    },
    id_perkuliahan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Perkuliahan',
          key:'id_perkuliahan',
        }
      }
}, {
    timestamps: false
})

export default Pengajar
