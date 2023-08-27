import { Faculty } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyService } from './faculty.service';
import { facultyFilterableFields, facultyOptions } from './faculty.variable';

export const createFaculty: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const semesterData = req.body;
		const result = await facultyService.createFaculty(semesterData);

		sendResponse<Faculty>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'faculty create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllfacultys: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const filters = pick(req.query, facultyFilterableFields);
		const options = pick(req.query, facultyOptions);

		const result = await facultyService.getAllfacultys(filters, options);

		sendResponse<Faculty[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Faculty fetch successfully',
			meta: result.meta,
			data: result.data,
		});
	} catch (error) {
		next(error);
	}
};

export const getfacultyById: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await facultyService.getfacultyById(id);

		sendResponse<Faculty>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Faculty fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
