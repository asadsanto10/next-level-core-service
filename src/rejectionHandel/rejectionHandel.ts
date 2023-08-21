import { Server } from 'http';
import { errorlogger, logger } from '../shared/logger';

export const uncaughtException = (): void => {
	process.on('uncaughtException', (error) => {
		errorlogger.error('uncaughtException is detected::: ', error);
		process.exit(1);
	});
};

export const unhandledRejection = (server: Server): void => {
	process.on('unhandledRejection', (error) => {
		if (server) {
			server.close(() => {
				errorlogger.error('Unhandled rejection is detected::::: ', error);
				process.exit(1);
			});
		} else {
			process.exit(1);
		}
	});
};

export const sigTerm = (server: Server): void => {
	process.on('SIGTERM', () => {
		logger.info('SIGTERM is received...');
		if (server) {
			server.close();
		}
	});
};
