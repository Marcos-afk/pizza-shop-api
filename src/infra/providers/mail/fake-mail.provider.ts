import { logsAdapter } from '@common/adapters/api-logs/logs.adapter';

import type { GenerateMailTemplateFromHTMLService } from './services/generate-mail-template-from-html.service';
import type {
	MailProviderProps,
	SendMailServiceDataProps,
} from './types/mail.provider-props';

import {
	type SendMailOptions,
	type Transporter,
	createTestAccount,
	createTransport,
	getTestMessageUrl,
} from 'nodemailer';
import { env } from 'src/env';

export class FakeMailProvider implements MailProviderProps {
	private transporter: Transporter;

	constructor(
		private readonly generateMailTemplateFromHTMLService: GenerateMailTemplateFromHTMLService,
	) {
		const setTransporter = async () => {
			const { smtp, user, pass } = await createTestAccount();

			this.transporter = createTransport({
				host: smtp.host,
				port: smtp.port,
				secure: smtp.secure,
				auth: {
					user,
					pass,
				},
			});
		};

		setTransporter().catch((error) =>
			logsAdapter.error('Erro ao criar transporter ethereal', error.message),
		);
	}

	public async execute({
		from = {
			email: env.MAIL_SENDER_EMAIL as string,
			name: env.MAIL_SENDER_NAME as string,
		},
		to,
		subject,
		templateFileName,
		templateVariables,
	}: SendMailServiceDataProps): Promise<void> {
		const mail: SendMailOptions = {
			from: {
				address: from.email,
				name: from.name,
			},

			to: Array.isArray(to)
				? to.map(({ email, name }) => ({ address: email, name }))
				: { address: to.email, name: to.name },

			subject,
		};

		mail.html = await this.generateMailTemplateFromHTMLService.execute({
			fileName: templateFileName,
			variables: templateVariables,
		});

		const sentMail = await this.transporter.sendMail(mail);

		logsAdapter.success(
			'Email gerado com sucesso',
			`E-mail preview URL: ${getTestMessageUrl(sentMail)}`,
		);
	}
}
