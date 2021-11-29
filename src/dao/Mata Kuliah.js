import MataKuliah from '../models/Mata_Kuliah'
// import sequelize from '../db.js'

export const findMatkulById = async (id) => {
  try {
    const matkul = await MataKuliah.findAll({
      where: {
        id: id
      }
    })
    return matkul[0]
  } catch (error) {
    return Promise.reject(new Error('Find Matkul by ID gagal'))
  }
}

export const findAllMatkul = async () => {
  try {
    const matkul = await MataKuliah.findAll()
    return matkul
  } catch (error) {
    return Promise.reject(new Error('Find all mata kuliah gagal'))
  }
}

export const insertOneMatkul = async (
  id,
  semester,
  namaMataKuliah,
  sksTeori,
  sksPraktik,
  kodeProgramStudi
) => {
  try {
    const matkul = await MataKuliah.create({
      id: id,
      semester: semester,
      nama_mata_kuliah: namaMataKuliah,
      sks_teori: sksTeori,
      sks_praktek: sksPraktik,
      kode_program_studi: kodeProgramStudi
    })
    return matkul
  } catch (error) {
    console.error(error)
  }
}