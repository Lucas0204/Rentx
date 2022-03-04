import fs from 'fs';
import { resolve } from 'path';

import { IStorageProvider } from "../IStorageProvider";
import upload from '@config/upload';


class LocalStorageProvider implements IStorageProvider {
    async save(file_name: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(upload.tmpFolder, file_name),
            resolve(upload.tmpFolder, folder, file_name)
        );

        return file_name;
    }

    async delete(file_name: string, folder: string): Promise<void> {
        const file_path = resolve(upload.tmpFolder, folder, file_name);
        

        try {
            await fs.promises.stat(file_path);
        } catch {
            return;
        }

        await fs.promises.unlink(file_path);
    }
}

export { LocalStorageProvider };
