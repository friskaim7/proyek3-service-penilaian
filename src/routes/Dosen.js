import express from 'express'
import * as DosenController from '../controller/Dosen'
import * as MatkulController from '../controller/Mata Kuliah'
import * as KelasController from '../controller/Kelas'
import * as ValidatorSanitizer from '../middleware/InputValidatorSanitizer'

const router = express.Router()

router.get('/get-one/:NIP', DosenController.getDosenByNIP)
router.get('/get-perkuliahan-dosen/:nip', DosenController.getPerkuliahanDosen)
router.get('/dosen/matkul/:nip/:id_kelas', MatkulController.getMatkulAjarByDosen)
router.get('/dosen/kelas/:nip', KelasController.getKelasAjarByDosen)
router.get('/all-dosen', DosenController.getAllDosen)
router.post('/new-dosen', ValidatorSanitizer.postNewDosen, DosenController.postNewDosen)
router.delete('/delete/:NIP', DosenController.deleteDosenByNIP)

export default router
