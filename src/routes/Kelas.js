import express from 'express'
import * as KelasController from '../controller/Kelas'

const router = express.Router()

router.get('/list-tahun', KelasController.getListTahun)
router.get('/all-kelas', KelasController.getAllKelas)

export default router
