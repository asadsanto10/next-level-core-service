import { AcademicSemester } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemestersService } from './academicSemester.service';
import {
	AcademicSemesterFilterAbleFileds,
	AcademicSemesterOptions,
} from './academicSemester.variable';

export const createSemester: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const semesterData = req.body;
		const result = await academicSemestersService.createSemester(semesterData);

		sendResponse<AcademicSemester>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'semester create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllAcademicSemesters: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const filters = pick(req.query, AcademicSemesterFilterAbleFileds);
		const options = pick(req.query, AcademicSemesterOptions);

		const result = await academicSemestersService.getAllAcademicSemesters(filters, options);

		sendResponse<AcademicSemester[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'semester fetch successfully',
			meta: result.meta,
			data: result.data,
		});
	} catch (error) {
		next(error);
	}
};
