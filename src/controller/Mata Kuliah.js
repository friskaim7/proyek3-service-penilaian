import * as PengajarDAO from '../dao/Pengajar'
import * as PerkuliahaDAO from '../dao/Perkuliahan'
import * as MatkulDAO from '../dao/Mata Kuliah'
// import * as KelasDAO from '../dao/Kelas'
// import expressValidator from 'express-validator/check'
// const { validationResult } = expressValidator

export const getMatkulAjarByDosen = async (req, res) => {
  try {
    const nip = req.params.nip
    const idKelas = req.params.id_kelas
    const pengajar = await PengajarDAO.findPengajarByNIP(nip)
    let i
    const idPerkuliahan = []
    const listIdPerkuliahan = []
    const listMatkul = []
    for (i = 0; i < pengajar.length; i++) {
      const idPerkuliahan = pengajar[i].id_perkuliahan
      listIdPerkuliahan.push(idPerkuliahan)
    }
    for (i = 0; i < listIdPerkuliahan.length; i++) {
      const perkuliahan = await PerkuliahaDAO.findPerkuliahanById(listIdPerkuliahan[i])
      if (perkuliahan.kode_kelas === idKelas) {
        const matkul = await MatkulDAO.findMatkulById(perkuliahan.id_mata_kuliah)
        listMatkul.push(matkul)
        idPerkuliahan.push(perkuliahan.id)
      }
    }
    res.status(200).json({
      message: 'get matkul by dosen sukses',
      data: {
        listMatkul,
        idPerkuliahan
      }
    })
  } catch (error) {
    res.status(error.status).json({ error })
  }
}

export const getListSemester = async (req, res) => {
  try {
    const matkul = await MatkulDAO.findAllMatkul()
    const listSemester = []
    let i
    for (i = 0; i < matkul.length; i++) {
      const semester = matkul[i].semester
      listSemester.push(semester)
    }

    const listSemesterUnique = listSemester.filter((c, index) => {
      return listSemester.indexOf(c) === index
    }).sort()

    res.status(200).json({
      message: 'get list semester from tabel semester sukses',
      data: {
        listSemesterUnique
      }
    })
  } catch (error) {
    res.status(error.status).json({ error })
  }
}
