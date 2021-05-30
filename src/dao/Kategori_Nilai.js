import Kategori_Nilai from '../models/Kategori_Nilai.js'
import MataKuliah from '../models/Mata_Kuliah.js'

import sequelize from '../db.js'


export const insertOneKategoriNilai = async (id_kategori,parent,nama_kategori,bobot_nilai,id_mata_kuliah) => {
  try {
    const mata_kuliah = await Mata_Kuliah.findOne({
      where : {id_mata_kuliah: id_mata_kuliah}
    })
    if(id_mata_kuliah === null){
      console.log("Id mata kuliah tidak ditemukan")
      throw error
    }
    const newKategoriNilai = await Kategori_Nilai.create({
      id_kategori: id_kategori,
      parent: parent,
      nama_kategori: nama_kategori,
      id_mata_kuliah: mata_kuliah.id_mata_kuliah,
    })
    return newKategoriNilai
  } catch (error) {
    console.log(error)
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
