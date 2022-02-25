import { ISendMailParams } from '../dtos/ISendMailParams';

export interface IMailProvider {
    sendMail(data: ISendMailParams): Promise<void>;
}
