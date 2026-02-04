import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: 'src/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

// Upload para imagens
export const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024  } //20mb
})

// Upload para documentos (Word, PDF, etc)
export const uploadDoc = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024  }, //50mb
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não suportado'));
    }
  }
})