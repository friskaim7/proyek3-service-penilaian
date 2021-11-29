import express from 'express'
import * as MataKuliahController from '../controller/Mata Kuliah'

const router = express.Router()

router.get('/listSemester', MataKuliahController.getListSemester)
router.post('/new-matkul', ValidatorSanitizer.postNewMatkul, MatkulController.postNewMatkul)

export default router
