import { SemesterRegistration } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { semesterRegiService } from './semesterRegistration.service';
import { semesterRegistrationFilterableFields } from './semesterRegistration.variable';

export const createSemesterReg: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body as SemesterRegistration;
		const result = await semesterRegiService.createSemesterReg(data);

		sendResponse<SemesterRegistration>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Semester Registration create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllSemesterReg: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const filters = pick(req.query, semesterRegistrationFilterableFields);
		const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

		const result = await semesterRegiService.getAllSemesterReg(filters, options);

		sendResponse<SemesterRegistration[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Semester Registration fetch successfully',
			meta: result.meta,
			data: result.data,
		});
	} catch (error) {
		next(error);
	}
};

export const getByIdSemesterReg: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await semesterRegiService.getByIdSemesterReg(id);

		sendResponse<SemesterRegistration>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Semester Registration fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const updateSemesterReg: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;
		const data = req.body as Partial<SemesterRegistration>;

		const result = await semesterRegiService.updateSemesterReg(id, data);

		sendResponse<SemesterRegistration>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Semester Registration update successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteSemesterReg: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await semesterRegiService.deleteCource(id);

		sendResponse<SemesterRegistration>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Semester Registration delete successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
