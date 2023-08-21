/* eslint-disable no-console */
import cors from 'cors';

import express, { Application } from 'express';

import cookieParser from 'cookie-parser';
import { Server } from 'http';
import globalErrorHandler from './app/middlewares/globalError/globalErrorHandler.middleware';
import router from './app/routes/router';
import { sigTerm, uncaughtException, unhandledRejection } from './rejectionHandel/rejectionHandel';
import { logger } from './shared/logger';

let server: Server;

const app: Application = express();
// server port
const port: number | string = process.env.PORT || 5006;

uncaughtException();

// parser
app.use(cors());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// console.log(app.get('env'));

// route
const base = '/api/v1';
app.use(base, router);

// global error
app.use(globalErrorHandler);

// eslint-disable-next-line prefer-const
server = app.listen(port, () => {
	logger.info(`Listening on port ${port}`);
});

// unhandled rejection
unhandledRejection(server);

// sigTerm detection
sigTerm(server);
