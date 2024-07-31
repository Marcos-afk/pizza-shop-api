import type { DateProviderProps } from './types/date.provider-props';

export class FakeDateProvider implements DateProviderProps {
	compareInHours(start_date: Date, end_date: Date): number {
		const timeDiff = end_date.getTime() - start_date.getTime();
		const hoursDiff = timeDiff / (1000 * 3600);
		return Math.abs(Math.round(hoursDiff));
	}

	convertToUtc(date: Date): string {
		return date.toISOString();
	}

	compareInDays(start_date: Date, end_date: Date): number {
		const timeDiff = end_date.getTime() - start_date.getTime();
		const daysDiff = timeDiff / (1000 * 3600 * 24);
		return Math.abs(Math.round(daysDiff));
	}

	dateNow(): Date {
		return new Date();
	}

	addDays(days: number): Date {
		const newDate = new Date();
		newDate.setDate(newDate.getDate() + days);
		return newDate;
	}

	addHours(hours: number): Date {
		const newDate = new Date();
		newDate.setTime(newDate.getTime() + hours * 3600000);
		return newDate;
	}

	compareIfBefore(start_date: Date, end_date: Date): boolean {
		return start_date.getTime() < end_date.getTime();
	}
}
