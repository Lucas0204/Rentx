import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementation/DayjsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementation/EtherealMailProvider';

container.registerSingleton<IDateProvider>(
    'DateProvider',
    DayjsDateProvider
)

container.registerInstance<IMailProvider>(
    'MailProvider',
    new EtherealMailProvider()
)
