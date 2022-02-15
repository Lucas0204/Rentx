import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (req, file, cb) => {
                    const hash = crypto.randomBytes(16).toString('hex');
                    const filename = `${hash}-${file.originalname}`;
    
                    cb(null, filename);
                }
            })
        }
    }
}
