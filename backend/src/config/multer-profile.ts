import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configurar Cloudinary (usa mesmas credenciais do multer principal)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuração de armazenamento de fotos de perfil no Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: any, file) => {
    return {
      folder: 'agreste-zeladoria/profiles',
      format: 'jpg',
      public_id: `profile-${req.user.userId}-${Date.now()}`,
    };
  },
});

// Filtro de tipos de arquivo
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Apenas imagens são permitidas (jpeg, jpg, png, gif, webp)'));
  }
};

// Configuração do multer para perfis
export const uploadProfile = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});
