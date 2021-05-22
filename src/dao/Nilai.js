import Kategori_Nilai from '../models/Kategori_Nilai.js'
import Nilai from '../models/Nilai.js'
import Nilai from '../models/Mahasiswa.js'

import sequelize from '../db.js'


export const insertOneNilai = async (
 /* NIP,
  namaDosen,
  jabatan,
  email,
  permissions,
  username*/
  id_nilai,
  Nilai
) => {
  try {
    const nilai = await Nilai.create({
      /*NIP,
      nama_dosen: namaDosen,
      jabatan,
      email,
      permissions,
      username*/
	  id_nilai,
	  nilai
    })
    return nilai
  } catch (error) {
    return Promise.reject(new Error('Insert nilai gagal'))
  }
}

/*export const findDosenByNIP = async (NIP) => {
  try {
    const dosen = await Dosen.findAll({
      where: {
        NIP
      }
    })
    return dosen[0]
  } catch (error) {
    return Promise.reject(new Error('Find dosen by NIP gagal'))
  }
}*/

export const findAllNilai = async () => {
  try {
    const nilai = await Nilai.findAll()
    return nilai
  } catch (error) {
    return Promise.reject(new Error('Find all nilai gagal'))
  }
}

/*export const findDosenByJabatan = async (jabatanDosen) => {
  try {
    if (jabatanDosen === '') {
      jabatanDosen = null
      const dosenNoJabatan = await Dosen.findAll({
        where: {
          jabatan: null
        },
        order: [
          ['nama_dosen', 'ASC']
        ]
      })
      return dosenNoJabatan
    }
    const dosen = await Dosen.findAll({
      where: {
        jabatan: sequelize.where(sequelize.fn('LOWER', sequelize.col('jabatan')), 'LIKE', '%' + jabatanDosen.toLowerCase() + '%')
      },
      order: [
        ['nama_dosen', 'ASC']
      ]
    })
    return dosen
  } catch (error) {
    return Promise.reject(new Error('Find dosen by jabatan gagal'))
  }
}*/

export const destroyNilaiByMahasiswa = async (NIP) => {
  try {
    const mahasiswa = await Mahasiswa_nilai.destroy({
      where: {
        /*NIP*/
      }
    })
    return mahasiswa
  } catch (error) {
    return Promise.reject(new Error('Delete Nilai by Mahasiswa gagal'))
  }
}
