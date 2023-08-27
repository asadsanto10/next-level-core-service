import { AcademicDepartment } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentService } from './academicDepartment.service';
// prettier-ignore
import {
	academicDepartmentFilterableFields,
	academicDepartmentOptions,
} from './academicDepartment.variable';

export const createDepartment: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body;
		const result = await academicDepartmentService.createDepartment(data);

		sendResponse<AcademicDepartment>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'AcademicDepartment create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllAcademicDepartments: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const filters = pick(req.query, academicDepartmentFilterableFields);
		const options = pick(req.query, academicDepartmentOptions);

		const result = await academicDepartmentService.getAllAcademicDepartments(filters, options);

		sendResponse<AcademicDepartment[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'AcademicDepartment fetch successfully',
			meta: result.meta,
			data: result.data,
		});
	} catch (error) {
		next(error);
	}
};

export const getAcademicDepartmentById: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await academicDepartmentService.getAcademicDepartmentById(id);

		sendResponse<AcademicDepartment>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'AcademicDepartment fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
