import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currencyCode?: string, locale?: string) {
	try {
		// Note: if no `locale` is provided, the browser's default
		// locale will be used.
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: currencyCode || 'USD'
		}).format(value);
	} catch {
		// A fallback in case the NumberFormat fails for any reason
		return value.toFixed(2);
	}
}

export function getUserInitials(name: string) {
	return name
		.split(' ')
		.map((n) => n[0])
		.join('');
}
