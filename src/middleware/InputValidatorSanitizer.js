import expressValidator from 'express-validator';
const { body, param } = expressValidator;
import * as DosenDAO from '../dao/Dosen'
import * as MahasiswaDAO from '../dao/Mahasiswa'
import * as MatkulDAO from '../dao/Mata Kuliah'

// CATATAN : File ini berisi middleware untuk memvalidasi dan sanitasi inputan yang dikirim oleh user

/* Validator dan Sanitizer untuk Dosen */

export const postNewDosen = [
  body('NIP', 'NIP wajib diisi').exists().bail(),
  body('NIP').custom((value) => {
    return DosenDAO.findDosenByNIP(value).then((dosen) => {
      if (dosen) {
        return Promise.reject(new Error('NIP sudah terdaftar'))
      }
    })
  }),
  body('namaDosen', 'Nama dosen wajib diisi').exists(),
  body('email', 'format email tidak valid').isEmail(),
  body('permission', 'permission wajib diisi').exists(),
  body('jabatan', 'format jabatan tidak valid atau jabatan tidak ada').isIn([
    'wali-kelas',
    'kajur',
    'kaprodi',
    'dosen-pengampu'
  ])
]

/* Validator dan Sanitizer untuk Mahasiswa */

export const postNewMahasiswa = [
  body('NIM', 'NIM wajib diisi').exists().bail(),
  body('NIM').custom((value) => {
    return MahasiswaDAO.findMahasiswaByNIM(value).then((mhs) => {
      if (mhs) {
        return Promise.reject(new Error('NIM sudah terdaftar'))
      }
    })
  }),
  body('namaMahasiswa', 'Nama Mahasiswa wajib diisi').exists(),
  body('angkatan', 'Angkatan wajib diisi').exists(),
  body('tingkat', 'Tingkat wajib diisi').exists(),
  body('email', 'Format email tidak valid').isEmail(),
  body('status', 'Status wajib diisi').exists()
  // body('nomorHp', 'Nomor Hp tidak valid').isLength({ min: 11 })
]

export const updateNomorHpMahasiswa = [
  body('nomorHP', 'Nomor HP wajib diisi').exists()
  // body('nomorHP', 'Nomor HP harus maksimal 13 angka').isLength({ max: 13}),
  // body('nomorHP', 'Nomor HP harus numerik').isNumeric(),
]

export const createUser = [
  body('noInduk', 'No induk wajib diisi').exists().bail(),
  body('jenisNoInduk', 'Jenis no iduk wajib diisi').exists(),
  body('nama', 'Nama wajib diisi').exists(),
  body('email', 'Format email tidak valid').isEmail(),
  body('role', 'Role wajib diisi').exists()
]

export const postNewNilai = [
  body('nilai', 'Nilai Wajib diisi').exists()
]

export const postNewNilaiAkhir = [
  body('nilai_akhir', 'Nilai Akhir Wajib diisi').exists()
]

export const postNewKategoriNilai = [
  body('id_kategori', 'id kategori Wajib diisi').exists(),
  body('bobot_nilai', 'bobot nilai Wajib diisi').exists(),
  body('id_matakuliah', 'id mata kuliah Wajib diisi').exists(),
]

export const updateNilaiMahasiswa = [
  body('nilai', 'Nilai wajib diisi').exists()
]

export const updateNilaiAkhirMahasiswa = [
  body('nilai_akhir', 'Nilai Akhir wajib diisi').exists()
]

export const deleteDosenByNIP = [
  param('NIP').custom((value) => {
    return DosenDAO.findDosenByNIP(value).then((dosen) => {
      if (dosen) {
        return Promise.reject(
          new Error('Dosen dengan NIP tersebut tidak ditemukan')
        )
      }
    })
  })
]


export const postNewMatkul = [
  body('id', 'ID wajib diisi').exists().bail(),
  body('id').custom((value) => {
    return MatkulDAO.findMatkulById(value).then((matkul) => {
      if (matkul) {
        return Promise.reject(new Error('Id Matkul sudah terdaftar'))
      }
    })
  }),
  body('semester', 'Semester wajib diisi').exists(),
  body('namaMataKuliah', 'Nama Mata Kuliah wajib diisi').exists(),
  body('sksTeori', 'SKS Teori wajib diisi').exists(),
  body('sksPraktik', 'SKS Praktik wajib diisi').exists(),
  body('kodeProgramStudi', 'kode Program Studi wajib diisi').exists()
]
