import { MULTER_ALLOWED_FILE_EXTENSIONS, MULTER_UPLOAD_FILE_MAX_SIZE } from '../utils/constants';
import multer from 'multer';
import path from 'path';



const uploadMulter = multer({
    limits: { fileSize: MULTER_UPLOAD_FILE_MAX_SIZE },
    fileFilter: function (_req, file, callback) {
        const ext = path.extname(file.originalname);
        if (!MULTER_ALLOWED_FILE_EXTENSIONS.includes(ext.replace('.', ''))) {
            return callback(new Error('Only pdf is allowed'));
        }
        callback(null, true);
    },
});

export default uploadMulter;
