import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

import { ISendMailParams } from "../../dtos/ISendMailParams";
import { IMailProvider } from "../IMailProvider";

class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        nodemailer
            .createTestAccount()
            .then(account => {
                const transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass
                    }
                });

                this.client = transporter;
            })
            .catch(err => console.error(err));
    }

    async sendMail({
        to,
        subject,
        template_variables,
        path
    }: ISendMailParams): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString('utf-8');

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse(template_variables);

        const message = await this.client.sendMail({
            to,
            from: 'Rentx <noreplay@rentx.com>',
            subject,
            html: templateHTML
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export { EtherealMailProvider };
