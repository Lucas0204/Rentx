import fs from 'fs';
import { S3 } from 'aws-sdk';
import { getType } from 'mime';
import { resolve } from 'path';

import { IStorageProvider } from "../IStorageProvider";
import upload from '@config/upload';

class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_S3_REGION
        })
    }
 
    async save(file_name: string, folder: string): Promise<string> {
        const filePath = resolve(upload.tmpFolder, file_name);

        const fileContent = await fs.promises.readFile(filePath);

        const ContentType = getType(filePath);

        await this.client.putObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file_name,
            ACL: 'public-read',
            Body: fileContent,
            ContentType
        }).promise();

        await fs.promises.unlink(filePath);

        return file_name;
    }

    async delete(file_name: string, folder: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file_name
        }).promise();
    }
}

export { S3StorageProvider };
