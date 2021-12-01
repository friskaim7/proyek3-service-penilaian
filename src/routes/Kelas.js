import express from 'express'
import * as KelasController from '../controller/Kelas'
import * as ValidatorSanitizer from '../middleware/InputValidatorSanitizer'

const router = express.Router()

router.get('/list-tahun', KelasController.getListTahun)
router.get('/all-kelas', KelasController.getAllKelas)
router.get('/get-one/:kodekelas', KelasController.getOneKelasByKodekelas)
router.post('/new-kelas', ValidatorSanitizer.postNewKelas, KelasController.postNewKelas)

export default router
