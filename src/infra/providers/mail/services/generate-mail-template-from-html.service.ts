import type { GenerateMailTemplateFromHTMLProps } from '../types/mail.provider-props';

import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

export class GenerateMailTemplateFromHTMLService {
	public execute = async ({
		fileName = 'mail.html',
		variables,
	}: GenerateMailTemplateFromHTMLProps): Promise<string> => {
		const tmpDir = resolve(process.cwd(), 'templates');

		const file = join(tmpDir, fileName);

		let templateContent = await readFile(file, {
			encoding: 'utf-8',
		});

		// biome-ignore lint/complexity/noForEach: <explanation>
		Object.entries(variables).forEach(([key, value]) => {
			const regex = new RegExp(`{{${key}}}`, 'g');

			templateContent = templateContent.replace(regex, String(value));
		});

		return templateContent;
	};
}
