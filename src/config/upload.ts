import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
    tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename: (req, file, cb) => {
            const hash = crypto.randomBytes(16).toString('hex');
            const filename = `${hash}-${file.originalname}`;

            cb(null, filename);
        }
    })
}
