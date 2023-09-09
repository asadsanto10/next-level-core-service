import { OfferedCourseSection } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseSectionService } from './offeredCourseSection.service';
import { offeredCourseSectionFilterableFields } from './offeredCourseSection.variable';

export const createOfferedCourseSection: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body as OfferedCourseSection;
		const result = await offeredCourseSectionService.createOfferedCourseSection(data);

		sendResponse<OfferedCourseSection>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Offered course section create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllOfferedCourseSection: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const filters = pick(req.query, offeredCourseSectionFilterableFields);
		const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

		const result = await offeredCourseSectionService.getAllOfferedCourseSection(filters, options);

		sendResponse<OfferedCourseSection[]>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Offered course section fetch successfully',
			meta: result.meta,
			data: result.data,
		});
	} catch (error) {
		next(error);
	}
};

export const getByIdOfferedCourseSection: RequestHandler = async (
	req,
	res,
	next
): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await offeredCourseSectionService.getByIdOfferedCourseSection(id);

		sendResponse<OfferedCourseSection>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Offered course section fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const updateOfferedCourseSection: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;
		const data = req.body as Partial<OfferedCourseSection>;

		const result = await offeredCourseSectionService.updateOfferedCourseSection(id, data);

		sendResponse<OfferedCourseSection>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Offered course section update successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteOfferedCourseSection: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await offeredCourseSectionService.deleteOfferedCourseSection(id);

		sendResponse<OfferedCourseSection>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Offered course section delete successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
