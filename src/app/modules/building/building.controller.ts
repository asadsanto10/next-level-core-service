import { Building } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { buildingService } from './building.service';
import { buildingFilterableFields } from './building.variable';

export const createBuilding: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body;
		const result = await buildingService.createBuilding(data);

		sendResponse<Building>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Building create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllBuildings: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const filters = pick(req.query, buildingFilterableFields);
		const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

		const result = await buildingService.getAllBuildings(filters, options);

		sendResponse<Building[]>(res, {
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

export const getBuildingById: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await buildingService.getBuildingById(id);

		sendResponse<Building>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Building fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const updateBuilding: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;
		const data = req.body as Partial<Building>;

		const result = await buildingService.updateBuilding(id, data);

		sendResponse<Building>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Building update successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteBuilding: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await buildingService.deleteBuilding(id);

		sendResponse<Building>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Building delete successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
