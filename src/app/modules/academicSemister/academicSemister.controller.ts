import { AcademicSemister } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { academicSemestersService } from './academicSemister.service';

export const createSemester: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const semesterData = req.body as AcademicSemister;
		const result = await academicSemestersService.createSemester(semesterData);

		sendResponse<AcademicSemister>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'semester create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
