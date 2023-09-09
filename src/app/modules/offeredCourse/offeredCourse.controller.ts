import { OfferedCourse } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ICreateOfferedCourse } from './offeredCourse.interface';
import { offeredService } from './offeredCourse.service';
import { offeredCourseFilterableFields } from './offeredCourse.variable';

export const createOfferedCourse: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body as ICreateOfferedCourse;
		const result = await offeredService.createOfferedCourse(data);

		sendResponse<Array<OfferedCourse>>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Offered course create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllOfferedCourse: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const filters = pick(req.query, offeredCourseFilterableFields);
		const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

		const result = await offeredService.getAllOfferedCourse(filters, options);

		sendResponse<OfferedCourse[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Offered course fetch successfully',
			meta: result.meta,
			data: result.data,
		});
	} catch (error) {
		next(error);
	}
};

export const getByIdOfferedCourse: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await offeredService.getByIdOfferedCourse(id);

		sendResponse<OfferedCourse>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Offered course fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const updateOfferedCourse: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;
		const data = req.body as Partial<OfferedCourse>;

		const result = await offeredService.updateOfferedCourse(id, data);

		sendResponse<OfferedCourse>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Offered course update successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteOfferedCourse: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await offeredService.deleteOfferedCourse(id);

		sendResponse<OfferedCourse>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Offered course delete successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
