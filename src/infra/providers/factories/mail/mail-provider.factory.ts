import { FakeMailProvider } from '@infra/providers/mail/fake-mail.provider';
import { MailProvider } from '@infra/providers/mail/mail.provider';
import { GenerateMailTemplateFromHTMLService } from '@infra/providers/mail/services/generate-mail-template-from-html.service';
import type { MailProviderProps } from '@infra/providers/mail/types/mail.provider-props';
import { env } from 'src/env';

let mailProviderInstance: MailProviderProps | null = null;
const generateMailTemplateFromHTMLService =
	new GenerateMailTemplateFromHTMLService();

export const MailProviderFactory = () => {
	if (!mailProviderInstance) {
		switch (env.NODE_ENV) {
			case 'development': {
				mailProviderInstance = new FakeMailProvider(
					generateMailTemplateFromHTMLService,
				);

				break;
			}

			case 'production': {
				mailProviderInstance = new MailProvider(
					generateMailTemplateFromHTMLService,
				);
				break;
			}

			case 'test': {
				mailProviderInstance = new MailProvider(
					generateMailTemplateFromHTMLService,
				);
				break;
			}

			default: {
				mailProviderInstance = new MailProvider(
					generateMailTemplateFromHTMLService,
				);
				break;
			}
		}
	}

	return mailProviderInstance;
};
