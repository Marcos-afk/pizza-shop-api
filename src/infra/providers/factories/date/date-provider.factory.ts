import { DateProvider } from '@infra/providers/date/date.provider';
import { FakeDateProvider } from '@infra/providers/date/fake-date.provider';
import type { DateProviderProps } from '@infra/providers/date/types/date.provider-props';
import { env } from 'src/env';

let dateProviderInstance: DateProviderProps | null = null;

export const DateProviderFactory = () => {
	if (!dateProviderInstance) {
		switch (env.NODE_ENV) {
			case 'development': {
				dateProviderInstance = new DateProvider();
				break;
			}

			case 'production': {
				dateProviderInstance = new DateProvider();
				break;
			}

			case 'test': {
				dateProviderInstance = new FakeDateProvider();
				break;
			}

			default: {
				dateProviderInstance = new DateProvider();
				break;
			}
		}
	}

	return dateProviderInstance;
};
