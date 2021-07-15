import * as NilaiAkhirDAO from '../dao/Nilai_Akhir'
import * as StudiDAO from '../dao/Studi'
import * as PerkuliahanDAO from '../dao/Perkuliahan'
import * as MatkulDAO from '../dao/Mata Kuliah'
import * as MahasiswaDAO from '../dao/Mahasiswa'

import expressValidator from 'express-validator/check'
import Studi from '../models/Studi'
const { validationResult } = expressValidator

export const updateNilaiAkhir = async (req, res, next) => {
  try {
    var idPerkuliahan = req.params.id_perkuliahan
    const dataNilaiAkhir = req.body.dataNilaiAkhir
    var listNilaiAkhir = []
    
    for(var i = 0; i<dataNilaiAkhir.length; i++){
      var nim = dataNilaiAkhir[i].nim
      const nilaiAkhir = {nilai_akhir: dataNilaiAkhir[i].nilai_akhir, nilai_ets: dataNilaiAkhir[i].nilai_ets, nilai_eas: dataNilaiAkhir[i].nilai_eas}
      const recordNilaiAkhir = await StudiDAO.updateNilaiAkhirByNimPerkuliahan(nim, idPerkuliahan, nilaiAkhir)
      listNilaiAkhir.push(recordNilaiAkhir)
    }

    if (listNilaiAkhir === null){
      console.log('gagal update nilai akhir')
      throw error
    }

    res.status(200).json({
      message: 'update nilai akhir sukses',
      data: {
        listNilaiAkhir
      }
    })
  } catch(error) {
    next(error)
  }
}
export const getNilaiAkhirByPerkuliahanDosen = async (req, res, next) => {
  try {
    var idPerkuliahan = req.params.id_perkuliahan
    const dataNilaiAkhir = await StudiDAO.findStudiByIdPerkuliahan(idPerkuliahan)

    var listNilaiAkhir = []
    for(var i = 0; i<dataNilaiAkhir.length; i++){
      var mhs = await MahasiswaDAO.findOneMahasiswaByNIM(dataNilaiAkhir[i].id_mahasiswa)
      const result = {nim: dataNilaiAkhir[i].id_mahasiswa, nama: mhs.nama, nilai_ets: dataNilaiAkhir[i].nilai_ets, nilai_eas: dataNilaiAkhir[i].nilai_eas, nilai_akhir: dataNilaiAkhir[i].nilai_akhir}
      listNilaiAkhir.push(result)
    }
    
    if (listNilaiAkhir === null) {
      console.log('Get nilai akhir by perkuliahan gagal')
      throw error
    }

    res.status(200).json({
      message: 'Get nilai akhir by perkuliahan sukses',
      data: {
        listNilaiAkhir
      }
    })
  } catch(error) {
    next(error)
  }
}
export const getNilaiAkhirByMahasiswa = async (req, res, next) => {
  try {
    var nim = req.params.nim
    const dataNilai = await StudiDAO.findStudiByNIM(nim)
    var listResult = []
    var totalIndeks = 0
    var totalSks = 0
    for(var i = 0; i<dataNilai.length; i++){
      const perkuliahan = await PerkuliahanDAO.findPerkuliahanById(dataNilai[i].id_perkuliahan)
      const matkul = await MatkulDAO.findMatkulById(perkuliahan.id_mata_kuliah)
      const result2 = {
        semester: matkul.semester,
        kode_matkul: matkul.id,
        nama_matkul: matkul.nama_mata_kuliah,
        // sks_teori: matkul.sks_teori,
        // sks_praktek: matkul.sks_praktek,
        sks: matkul.sks_teori + matkul.sks_praktek,
        nilai_akhir: dataNilai[i].nilai_akhir
      }
      listResult.push(result2)
    }
    //sorting by semester
    listResult.sort((a,b) => {
      return a.semester - b.semester
    })

    for(var j=0; j<listResult.length; j++){
      totalIndeks += listResult[j].nilai_akhir * listResult[j].sks
      totalSks += listResult[j].sks
    }
    var ip = totalIndeks / totalSks

    if (dataNilai === undefined || listResult === null) {
      console.log('Get nilai akhir by mahasiswa gagal')
      throw error
    }

    res.status(200).json({
      message: 'Get nilai akhir by mahasiswa sukses',
      data: {
        dataNilaiAkhir: listResult,
        jumlahSks: totalSks,
        IPK: ip
      }
    })
  } catch(error) {
    next(error)
  }
}
export const getNilaiAkhirSemesterByMahasiswa = async (req, res, next) => {
  try {
    var nim = req.params.nim
    var smt = req.params.semester
    const dataNilai = await StudiDAO.findStudiByNIM(nim)
    var listResult = []
    var totalIndeks = 0
    var totalSks = 0
    for(var i = 0; i<dataNilai.length; i++){
      const perkuliahan = await PerkuliahanDAO.findPerkuliahanById(dataNilai[i].id_perkuliahan)
      const matkul = await MatkulDAO.findMatkulById(perkuliahan.id_mata_kuliah)
      if(matkul.semester == smt){
        const result2 = {
          semester: matkul.semester,
          kode_matkul: matkul.id,
          nama_matkul: matkul.nama_mata_kuliah,
          // sks_teori: matkul.sks_teori,
          // sks_praktek: matkul.sks_praktek,
          sks: matkul.sks_teori + matkul.sks_praktek,
          nilai_akhir: dataNilai[i].nilai_akhir
        }
        listResult.push(result2)
        }
      }
      for(var j=0; j<listResult.length; j++){
        totalIndeks += listResult[j].nilai_akhir * listResult[j].sks
        totalSks += listResult[j].sks
      }
    var ip = totalIndeks / totalSks
    if (dataNilai === undefined || listResult === null) {
      console.log('Get nilai akhir by mahasiswa gagal')
      throw error
    }

    res.status(200).json({
      message: 'Get nilai akhir by mahasiswa sukses',
      data: {
        dataNilaiAkhir: listResult,
        jumlahSks: totalSks,
        IPS: ip
      }
    })
  } catch(error) {
    next(error)
  }
}
export const postNewNilaiAkhir = async (req, res, next) => {
  try {
    const {
      id_studi,
	  id,
	  nilai_akhir
    } = req.body
    const error = validationResult(req)

    if (!error.isEmpty()) {
      error.status = 400
      throw error
    }

    const nilaiAkhirInsert = await NilaiAkhirDAO.insertOneNilaiAkhir(id_studi,id, nilai_akhir)

    if (typeof nilaiAkhirInsert === 'undefined') {
      error.status = 500
      error.message = 'Insert Nilai Akhir gagal'
      throw error
    }

    res.status(200).json({
      message: 'insert nilai akhir sukses',
      data: {
        nilaiAkhirInsert
      }
    })
  } catch (error) {
    next(error)
  }
}

export const deleteNilaiAkhirbyMatkul = async (req, res, next) => {
  try {
    const nilaiakhirId = req.params.id_studi
    const result = await NilaiAkhirDAO.deleteNilaiAkhirbyMatkul(nilaiakhirId)
    if (result === 1) {
      res.status(200).json({
        message: 'Delete nilai berhasil',
        data: {
          mahasiswaId
        }
      })
    } else {
      const error = new Error('Delete nilai gagal')
      error.statusCode = 500
      throw error
    }
  } catch (error) {
    next(error)
  }
}

export const getAllNilaiAkhir = async (req, res, next) => {
  try {
    const nilai = await NilaiAkhirDAO.getAllNilaiAkhir()
    res.status(200).json({
      message: 'get all nilai akhir success',
      data: {
        nilai
      }
    })
  } catch (error) {
    next(error)
  }
}

export const updateNilaiAkhirbyMatkul = async (req, res, next) => {
  try {
    const { id_studi } = req.params
    const updateNilaiAkhir = await NilaiAkhirDAO.updateNilaiAkhirbyMatkul(id_studi, req.body.nilai_akhir)
    if (updateNilaiAkhir === 1) {
      const nilai_akhir = await NilaiAkhirDAO.getOneNilaiAkhirbyMatkul(id_studi)
      res.status(200).json({
        message: 'Update Nilai Akhir Mahasiswa berhasil',
        data: {
          nilai_akhir
        }
      })
    } else {
      const error = new Error('Update Nilai Akhir Mahasiswa gagal')
      error.statusCode = 500
      error.cause = 'Update Nilai Akhir Mahasiswa gagal'
      throw error
    }
  } catch (error) {
    next(error)
  }
}

export const getOneNilaiAkhirbyMatkul = async (req, res, next) => {
  try {
    const { id_studi } = req.params
    const nilai_akhir = await NilaiAkhirDAO.getOneNilaiAkhirbyMatkul(id_studi)
    res.status(200).json({
      message: 'get one Nilai Akhir by Markul success',
      data: {
        id_studi
      }
    })
  } catch (error) {
    next(error)
  }
}
