import 'dotenv/config';

import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementation/DayjsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementation/EtherealMailProvider';
import { LocalStorageProvider } from './StorageProvider/implementation/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementation/S3StorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>(
    'DateProvider',
    DayjsDateProvider
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    new EtherealMailProvider()
);

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
};

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    diskStorage[process.env.DISK_STORAGE]
);
