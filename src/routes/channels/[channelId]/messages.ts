import { t } from 'elysia';
import type { ElysiaApp } from '../../..';

export default (app: ElysiaApp) =>
	app.post(
		'/',
		async ({ body, params }) => {
			console.log(body, params);
		},
		{
			params: t.Object({
				channelId: t.Numeric({
					description: 'The channel id',
					examples: ['123']
				})
			}),
			body: t.Object({
				content: t.String({ description: 'The message content', minLength: 1, maxLength: 2000 }),
				nonce: t.String({ description: 'Message internal identifier', minLength: 1, maxLength: 255 })
			}),
			response: {
				200: t.Void()
			}
		}
	);
