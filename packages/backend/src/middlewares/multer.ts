import multer from 'multer';

const fileStorage = multer.memoryStorage();

const baseMulter = multer({ storage: fileStorage });

export const multerFile = baseMulter.single('file');
export const multerImage = baseMulter.single('image');
