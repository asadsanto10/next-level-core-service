import { Course, CourseFaculty } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ICourseCreateData } from './course.interface';
import { courceService } from './course.service';
import { courseFilterableFields } from './course.variable';

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

export const getAllCources: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const filters = pick(req.query, courseFilterableFields);
		const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

		const result = await courceService.getAllCources(filters, options);

		sendResponse<Course[]>(res, {
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

export const getCourceById: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await courceService.getCourceById(id);

		sendResponse<Course>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Course fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const updateCource: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;
		const data = req.body as Partial<ICourseCreateData>;

		const result = await courceService.updateCource(id, data);

		sendResponse<Course>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Course update successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteCource: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await courceService.deleteCource(id);

		sendResponse<Course>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Course delete successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const assignFaculties: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body?.faculties as Array<string>;
		const { courseId } = req.params;
		const result = await courceService.assignFaculties(courseId, data);

		sendResponse<CourseFaculty[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Course faculty assigned successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const removeFaculties: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body?.faculties as Array<string>;
		const { courseId } = req.params;
		const result = await courceService.removeFaculties(courseId, data);
		sendResponse<CourseFaculty[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Course faculty remove successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
