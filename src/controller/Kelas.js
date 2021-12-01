import * as PengajarDAO from '../dao/Pengajar'
import * as PerkuliahaDAO from '../dao/Perkuliahan'
import * as KelasDAO from '../dao/Kelas'
import expressValidator from 'express-validator/check'
const { validationResult } = expressValidator

export const getKelasAjarByDosen = async (req, res, next) => {
  try {
    const nip = req.params.nip
    const pengajar = await PengajarDAO.findPengajarByNIP(nip)
    let i
    // let j
    const listIdPerkuliahan = []
    const listKelas = []
    for (i = 0; i < pengajar.length; i++) {
      const idPerkuliahan = pengajar[i].id_perkuliahan
      listIdPerkuliahan.push(idPerkuliahan)
    }
    for (i = 0; i < listIdPerkuliahan.length; i++) {
      const perkuliahan = await PerkuliahaDAO.findPerkuliahanById(listIdPerkuliahan[i])
      const kelas = await KelasDAO.findKelasByKodeKelas(perkuliahan.kode_kelas)
      listKelas.push(kelas)
    }
    const seen = new Set()
    const uniqueClass = listKelas.filter(data => {
      const duplicate = seen.has(data.kode_kelas)
      seen.add(data.kode_kelas)
      return !duplicate
    })
    res.status(200).json({
      message: 'get matkul by dosen sukses',
      data: {
        uniqueClass
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getListTahun = async (req, res) => {
  try {
    const kelas = await KelasDAO.findAllKelas()
    const listTahun = []
    let i
    for (i = 0; i < kelas.length; i++) {
      const tahun = kelas[i].tahun
      listTahun.push(tahun)
    }

    const listTahunUnique = listTahun.filter((c, index) => {
      return listTahun.indexOf(c) === index
    }).sort()

    res.status(200).json({
      message: 'get list tahun from tabel kelas sukses',
      data: {
        listTahunUnique
      }
    })
  } catch (error) {
    res.status(error.status).json({ error })
  }
}

export const getAllKelas = async (req, res, next) => {
  try {
    const kelas = await KelasDAO.findAllKelas()
    res.status(200).json({
      message: 'get all kelas success',
      data: {
        kelas
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getOneKelasByKodekelas = async (req, res, next) => {
  try {
    const { kodekelas } = req.params
    const kelas = await KelasDAO.findKelasByKodeKelas(kodekelas)
    res.status(200).json({
      message: 'get one kelas by kodekelas success',
      data: {
        kelas
      }
    })
  } catch (error) {
    next(error)
  }
}

export const postNewKelas = async (req, res, next) => {
  try {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      error.status = 400
      throw error
    }

    const {
      kodeKelas,
      kodeProgramStudi,
      NIP,
      Tahun,
    } = req.body

    const kelas = await KelasDAO.insertOneKelas(
      parseInt(kodeKelas),
      kodeProgramStudi,
      NIP,
      parseInt(Tahun)
    )

    if (typeof kelas === 'undefined') {
      error.status = 500
      error.message = 'Insert kelas gagal'
      throw error
    }

    res.status(200).json({
      message: 'insert kelas sukses',
      data: {
        kelas
      }
    })
  } catch (error) {
    next(error)
  }  
}

export const deleteKelasbyKodekelas = async (req, res, next) => {
  try {
    const { kodekelas } = req.params
    const result = await KelasDAO.deleteKelasbyKodekelas(kodekelas)
    if (result === 1) {
      res.status(200).json({
        message: 'Delete kelas berhasil',
        data: {
          kodekelas
        }
      })
    } else {
      const error = new Error('Delete kelas gagal')
      error.statusCode = 500
      throw error
    }
  } catch (error) {
    next(error)
  }
}