import express from 'express'
import * as KelasController from '../controller/Kelas'

const router = express.Router()

router.get('/list-tahun', KelasController.getListTahun)
router.get('/all-kelas', KelasController.getAllKelas)
router.get('/get-one/:kodekelas', KelasController.getOneKelasByKodekelas)

export default router
