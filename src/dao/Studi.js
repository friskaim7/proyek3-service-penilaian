import Studi from '../models/Studi'
import sequelize from '../db.js'

export const findStudiByIdPerkuliahan = async (idPerkuliahan) => {
    try {
      const studi = await Studi.findAll({
        where: {
          id_perkuliahan: idPerkuliahan
        }
      })
      return studi
    } catch (error) {
      return Promise.reject(new Error('Find Studi By Perkuliahan gagal'))
    }
  }