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

export const updateNilaibyMatkul = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateNilai = await NilaiDAO.updateNilaibyMahasiswa(id_mahasiswa, req.body.nilai)
    if (updateNilai === 1) {
      const nilai = await NilaiDAO.findNilaibyMahasiswa(id_mahasiswa)
      res.status(200).json({
        message: 'Update Nilai Mahasiswa berhasil',
        data: {
          nilai
        }
      })
    } else {
      const error = new Error('Update Nilai Mahasiswa gagal')
      error.statusCode = 500
      error.cause = 'Update Nilai Mahasiswa gagal'
      throw error
    }
  } catch (error) {
    next(error)
  }
}

export const getOneNilaibyMahasiswa = async (req, res, next) => {
  try {
    const { NIM } = req.params
    const nilai = await NilaiDAO.getOneNilaibyMahasiswa(NIM)
    res.status(200).json({
      message: 'get one Mahasiswa by NIM success',
      data: {
        mahasiswa
      }
    })
  } catch (error) {
    next(error)
  }
}
