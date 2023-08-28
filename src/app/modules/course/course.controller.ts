import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { ICourseCreateData } from './course.interface';
import { courceService } from './course.service';

export const createCourse: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body as ICourseCreateData;
		const result = await courceService.createCourse(data);

		sendResponse<unknown>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'cource create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
