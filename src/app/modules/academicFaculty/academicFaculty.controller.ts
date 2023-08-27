import { AcademicFaculty } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyService } from './academicFaculty.service';
// prettier-ignore
import {
  academicFacultyFilterableFields,
  academicFacultyOptions,
} from './academicFaculty.variable';

export const createFaculty: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body;
		const result = await academicFacultyService.createFaculty(data);

		sendResponse<AcademicFaculty>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'faculty create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllAcademicFacultys: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const filters = pick(req.query, academicFacultyFilterableFields);
		const options = pick(req.query, academicFacultyOptions);

		const result = await academicFacultyService.getAllAcademicFacultys(filters, options);

		sendResponse<AcademicFaculty[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'faculty fetch successfully',
			meta: result.meta,
			data: result.data,
		});
	} catch (error) {
		next(error);
	}
};

export const getAcademicFacultyById: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await academicFacultyService.getAcademicFacultyById(id);

		sendResponse<AcademicFaculty>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'faculty fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
