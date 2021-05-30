import * as KategoriNilaiDAO from '../dao/Kategori_Nilai'
import { validationResult } from 'express-validator/check'

export const postNewNilai = async (req, res, next) => {
  try {
    const {
      id_kategori,
	  parent,
	  nama_kategori,
	  bobot_nilai,
    id_mata_kuliah
    } = req.body
    const error = validationResult(req)

    if (!error.isEmpty()) {
      error.status = 400
      throw error
    }

    const kategorinilaiInsert = await KategoriNilaiDAO.insertOneKategoriNilai(id_kategori,parent,nama_kategori,bobot_nilai,id_mata_kuliah)

    if (typeof kategorinilaiInsert === 'undefined') {
      error.status = 500
      error.message = 'Insert Kategori Nilai gagal'
      throw error
    }

    res.status(200).json({
      message: 'insert kategori nilai sukses',
      data: {
        kategorinilaiInsert
      }
    })
  } catch (error) {
    next(error)
  }
}

export const deleteNilaibyMahasiswa = async (req, res, next) => {
  try {
    const nilaiId = req.params.id_nilai
    const result = await NilaiDAO.deleteNilaibyMahasiswa(nilaid)
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

export const getAllNilai = async (req, res, next) => {
  try {
    const nilai = await NilaiDAO.findAllNilai()
    res.status(200).json({
      message: 'get all nilai success',
      data: {
        nilai
      }
    })
  } catch (error) {
    next(error)
  }
}

export const updateNilaibyMahasiswa = async (req, res, next) => {
  try {
    const { id_mahasiswa } = req.params
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
    const nilai = await NilaiDAO.findOneNilaibyMahasiswa(NIM)
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
