import { Student } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentService } from './student.service';
import { studentFilterableFields, studentOptions } from './student.variable';

export const createStudent: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body;
		const result = await studentService.createStudent(data);

		sendResponse<Student>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'student create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllStudents: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const filters = pick(req.query, studentFilterableFields);
		const options = pick(req.query, studentOptions);

		const result = await studentService.getAllStudents(filters, options);

		sendResponse<Student[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Student fetch successfully',
			meta: result.meta,
			data: result.data,
		});
	} catch (error) {
		next(error);
	}
};

export const getStudentById: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await studentService.getStudentById(id);

		sendResponse<Student>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Student fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
