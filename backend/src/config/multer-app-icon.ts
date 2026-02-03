import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuração de armazenamento do ícone do app no Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: any, file) => {
    return {
      folder: 'agreste-zeladoria/app-icons',
      format: 'png',
      public_id: `app-icon-${Date.now()}`,
    };
  },
});

// Filtro de tipos de arquivo (apenas PNG e JPG para ícones)
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png/;
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Apenas imagens PNG ou JPG são permitidas para o ícone do app'));
  }
};

// Configuração do multer para ícone do app
export const uploadAppIcon = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});
