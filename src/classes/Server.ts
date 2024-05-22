import cors from '@elysiajs/cors';
import { Elysia } from 'elysia';

export class Server {
	public static readonly port = process.env['PORT'] ?? 4000;

	public elysia: Elysia = new Elysia({ precompile: true });

	public constructor() {
		this.initCORS();
		this.initErrorListener();
		this.initEndpoints();
	}

	private initCORS(): void {
		this.elysia.use(cors());
	}

	private initErrorListener(): void {
		this.elysia.onError(({ code, error }) => {
			if (code === 'NOT_FOUND') {
				return 'Not Found';
			}

			if (code === 'VALIDATION') {
				return 'Validation Error';
			}

			if (code === 'PARSE') {
				return 'Parse Error';
			}

			if (error instanceof Error || code === 'INTERNAL_SERVER_ERROR') {
				console.error(error);
				return 'Internal Server Error';
			}

			return error;
		});
	}

	private initEndpoints(): void {}

	public listen() {
		this.elysia.listen(Server.port, ({ port }) => console.info(`Listening on: http://localhost:${port}`));
	}
}
