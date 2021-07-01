import * as NilaiAkhirDAO from '../dao/Nilai_Akhir'
import { validationResult } from 'express-validator/check'

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
