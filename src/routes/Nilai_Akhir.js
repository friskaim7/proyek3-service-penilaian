import express from 'express'
import * as NilaiAkhirController from '../controller/Nilai_Akhir'
import * as ValidatorSanitizer from '../middleware/InputValidatorSanitizer'

const router = express.Router()

router.post('/new-nilai-akhir',ValidatorSanitizer.postNewNilaiAkhir, NilaiAkhirController.postNewNilaiAkhir)
router.delete('/delete-nilaiAkhirByMatkul/:id_studi',NilaiAkhirController.deleteNilaiAkhirbyMatkul)
router.put('/update-nilai-akhir/:nilai_akhir',ValidatorSanitizer.updateNilaiAkhirMahasiswa, NilaiAkhirController.updateNilaiAkhirMahasiswa)
router.get('/AllNilaiAkhir', NilaiAkhirController.getAllNilaiAkhir)
router.get('/One-nilaiAkhirbyMatkul/:id_studi', NilaiAkhirController.getOneNilaiAkhirbyMahasiswa)

export default router
