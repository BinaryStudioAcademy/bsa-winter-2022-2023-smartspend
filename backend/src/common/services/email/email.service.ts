// eslint-disable-next-line no-restricted-syntax
import type NodeMailer from 'nodemailer';

import { type IConfig } from '~/common/config/config.js';

import { type EmailProperties } from '../../types/types.js';

type GenerateEmailReturnType = {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
};

type GenerateTransporterConfig = {
    service: string;
    auth: {
        user: string;
        pass: string;
    };
};

class EmailService {
    private nodeMailer: typeof NodeMailer;
    private config: IConfig;

    public constructor(nodeMailer: typeof NodeMailer, config: IConfig) {
        this.nodeMailer = nodeMailer;
        this.config = config;
    }

    private generateTransporterConfig(): GenerateTransporterConfig {
        return {
            service: 'gmail',
            auth: {
                user: this.config.ENV.EMAIL.GMAIL_DOMAIN,
                pass: this.config.ENV.EMAIL.GMAIL_PASSWORD,
            },
        };
    }

    private createTransporter(): NodeMailer.Transporter {
        const transporterConfig = this.generateTransporterConfig();
        return this.nodeMailer.createTransport(transporterConfig);
    }

    private generateEmailConfig({
        to,
        subject,
        text,
        html,
    }: EmailProperties): GenerateEmailReturnType {
        return {
            from: this.config.ENV.EMAIL.GMAIL_DOMAIN,
            to,
            subject,
            text,
            html,
        };
    }

    public async sendEmail({
        to,
        subject,
        text,
        html,
    }: EmailProperties): Promise<unknown> {
        const transporter = this.createTransporter();
        const emailConfig = this.generateEmailConfig({
            to,
            subject,
            text,
            html,
        });
        return await transporter.sendMail(emailConfig);
    }
}

export { EmailService };
