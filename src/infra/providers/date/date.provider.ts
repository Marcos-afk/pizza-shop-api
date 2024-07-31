import type { DateProviderProps } from './types/date.provider-props';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export class DateProvider implements DateProviderProps {
	convertToUtc(date: Date): string {
		return dayjs(date).utc().local().format();
	}

	compareInHours(start_date: Date, end_date: Date): number {
		const end_date_utc = this.convertToUtc(end_date);
		const start_date_utc = this.convertToUtc(start_date);
		return dayjs(end_date_utc).diff(start_date_utc, 'hour');
	}

	compareInDays(start_date: Date, end_date: Date): number {
		const end_date_utc = this.convertToUtc(end_date);
		const start_date_utc = this.convertToUtc(start_date);
		return dayjs(end_date_utc).diff(start_date_utc, 'day');
	}

	compareIfBefore(start_date: Date, end_date: Date): boolean {
		return dayjs(start_date).isBefore(end_date);
	}

	dateNow(): Date {
		return dayjs().toDate();
	}

	addDays(days: number): Date {
		return dayjs().add(days, 'day').toDate();
	}

	addHours(hours: number): Date {
		return dayjs().add(hours, 'hour').toDate();
	}
}
