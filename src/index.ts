import { Server } from './classes/Server.ts';

const sv = new Server();

sv.listen();

export type ElysiaApp = typeof sv.elysia;
