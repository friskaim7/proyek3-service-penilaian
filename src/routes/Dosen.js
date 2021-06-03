import express from 'express'
import * as DosenController from '../controller/Dosen'
import * as ValidatorSanitizer from '../middleware/InputValidatorSanitizer'

const router = express.Router()

router.get('/get-one/:NIP', DosenController.getDosenByNIP)
router.get('/get-perkuliahan-dosen/:nip', DosenController.getPerkuliahanDosen)
router.get('/get-kelas-dosen/:nip', DosenController.getKelasDosen)
router.get('/get-matakuliah-dosen/:nip', DosenController.getMataKuliahDosen)
router.get('/all-dosen', DosenController.getAllDosen)
router.get('', DosenController.getDosenByJabatan)
router.post('/new-dosen', ValidatorSanitizer.postNewDosen, DosenController.postNewDosen)
router.delete('/delete/:NIP', DosenController.deleteDosenByNIP)

export default router
