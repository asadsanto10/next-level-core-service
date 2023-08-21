import { Response } from 'express';

const sendResponse = <T>(
	response: Response,
	data: {
		statusCode: number;
		status: string | number;
		message?: string | null;
		data?: T | null;
		meta?: {
			page: number;
			limit: number;
			total: number;
		};
	}
): void => {
	response
		.status(data.statusCode)
		.json({ status: data.status, message: data.message || null, data: data.data, meta: data.meta });
};

export default sendResponse;
