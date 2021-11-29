import express from 'express'
import * as MataKuliahController from '../controller/Mata Kuliah'

const router = express.Router()

router.get('/listSemester', MataKuliahController.getListSemester)
router.post('/new-matkul', ValidatorSanitizer.postNewMatkul, MatkulController.postNewMatkul)
router.get('/all-matkul', MatkulController.getAllMatkul)
router.get('/get-one/:id', MatkulController.getOneMatkulById)
router.delete('/delete-matkul-by-id/:id', MatkulController.deleteMatkulbyId)

export default router
