import Indeks_Prestasi from '../models/Indeks_Prestasi.js'
import Mahasiswa from '../models/Mahasiswa.js'
import Mata_Kuliah from '../models/Mata_Kuliah.js'

import sequelize from '../db.js'

export const insertOneIp = async (ip_semester,nim,semester) => {
  try {
    const indeks_prestasi = await Indeks_Prestasi.findOne({
      where : {ip_semester: ip_semester}
    })
    if(indeks_prestasi === null){
      console.log("Ip Semester tidak ditemukan")
      throw error
    }
    const mahasiswa = await Mahasiswa.findOne({
      where : {nim: nim}
    })
    if(indeks_prestasi === null){
      console.log("Ip Semester tidak ditemukan")
      throw error
    }
	const matkul = await Studi.findOne({
        where: {id: id}
      })
    if(matkul === null){
      console.log("Mata Kuliah tidak ditemukan")
      throw error
    }
	const semester = await matkul.findOne({
		where: {semester:semester}
	  })
    if(semester === null){
      console.log("Semester tidak ditemukan")
      throw error
    }
    const newIndeksPrestasi = await Indeks_Prestasi.create({
      ip_semester: ip_semester,
      semester semester,
      nim: nim,
    })
    return newIndeksPrestasi
  } catch (error) {
    console.log(error)
  }
}

export const getOneIpBymatkul= async (id) => {
  try {
    const nilaiakhir = await studi.findAll({
      where: {
        id
      }
    })
    return nilaiakhir
  } catch (error) {
    return Promise.reject(new Error('Get nilai akhir by Mata Kuliah'))
  }
}

export const getAllIndeksPrestasi = async () => {
  try {
    const nilaiakhir = await Studi.findAll()
    return nilaiakhir
  } catch (error) {
    return Promise.reject(new Error('Get all nilai gagal'))
  }
}

export const destroyIndeksPrestasiByMataKuliah = async (id) => {
  try {
    const nilaiakhir = await studi.destroy({
      where: {
        id
      }
    })
    return nilaiakhir
  } catch (error) {
    return Promise.reject(new Error('Delete Nilai Akhir by Mahasiswa gagal'))
  }
}

export const updateIndeksPrestasibyMatkul = async (id, nilai_akhir) => {
  try {
    const nilai_akhir_mahasiswa = await Studi.update(
      {
        nilai_akhir_mahasiswa: nilai_akhir
      },
      {
        where: {
          id
        },
        silent: true
      }
    )
    return nilai_akkhir_mahasiswa[0]
  } catch (error) {
    console.error(error)
  }
}