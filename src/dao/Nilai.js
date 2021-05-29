import Kategori_Nilai from '../models/Kategori_Nilai.js'
import Nilai from '../models/Nilai.js'
import Mahasiswa from '../models/Mahasiswa.js'

import sequelize from '../db.js'


export const insertOneNilai = async (
 /* NIP,
  namaDosen,
  jabatan,
  email,
  permissions,
  username*/
  id_nilai,
  nilai
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

export const findOneNilaibyMahasiswa= async (NIM) => {
  try {
    const nilai = await Nilai.findAll({
      where: {
        NIM
      }
    })
    return nilai[0]
  } catch (error) {
    return Promise.reject(new Error('Find nilai by Mahasiswa gagal'))
  }
}

export const findAllNilai = async () => {
  try {
    const nilai = await Nilai.findAll()
    return nilai
  } catch (error) {
    return Promise.reject(new Error('Find all nilai gagal'))
  }
}

export const updateNilaibyMahasiswa = async (NIM, nilai) => {
  try {
    const nilai_mahasiswa = await Nilai.update(
      {
        nilai_mahasiswa: nilai
      },
      {
        where: {
          NIM
        },
        silent: true
      }
    )
    return nilai_mahasiswa[0]
  } catch (error) {
    console.error(error)
  }
}

export const destroyNilaiByMahasiswa = async (NIM) => {
  try {
    const nilai = await Mahasiswa_nilai.destroy({
      where: {
        NIM
      }
    })
    return nilai
  } catch (error) {
    return Promise.reject(new Error('Delete Nilai by Mahasiswa gagal'))
  }
}
