import Kelas from '../models/Kelas'

export const findKelasByKodeKelas = async (kodeKelas) => {
  try {
    const kelas = await Kelas.findByPk(kodeKelas)
    return kelas
  } catch (error) {
    return Promise.reject(error)
  }
}

export const findAllKelas = async () => {
  try {
    const kelas = await Kelas.findAll()
    return kelas
  } catch (error) {
    return Promise.reject(new Error('Find all kelas gagal'))
  }
}

export const insertOneKelas = async (
  kodeKelas,
  kodeProgramStudi,
  NIP,
  Tahun  
) => {
  try {
    const kelas = await Kelas.create({
      kode_kelas: kodeKelas,
      tahun: Tahun,
      nip: NIP,
      kode_program_studi: kodeProgramStudi
    })
    return kelas
  } catch (error) {
    console.error(error)
  }
}

export const deleteKelasbyKodekelas = async (kodekelas) => {
  try {
    const result = await Kelas.destroy({
      where: {
        kode_kelas: kodekelas
      }
    })
    return result
  } catch (error) {
    console.log(error)
  }
}