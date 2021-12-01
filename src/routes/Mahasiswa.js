import express from 'express'
import * as MahasiswaController from '../controller/Mahasiswa'
import * as ValidatorSanitizer from '../middleware/InputValidatorSanitizer'

const router = express.Router()

router.post('/new-mahasiswa', ValidatorSanitizer.postNewMahasiswa, MahasiswaController.postNewMahasiswa)
router.put('/updatePhone-mahasiswa/:NIM', ValidatorSanitizer.updateNomorHpMahasiswa, MahasiswaController.updateNomorHpMahasiswa)
router.delete('/delete-mahasiswaByNIM/:NIM', MahasiswaController.deleteMahasiswabyNIM)
router.get('/AllMahasiswa', MahasiswaController.getAllMahasiswa)
router.get('/getOne/:NIM', MahasiswaController.getOneMahasiswaByNIM)
router.get('/searchByName/:nama', MahasiswaController.searchMahasiswaByName)
router.get('/searchByNIM/:NIM', MahasiswaController.searchMahasiswaByNIM)

router.get('/perkuliahan/:id_perkuliahan', MahasiswaController.getMahasiswaByPerkuliahan)

export default router
