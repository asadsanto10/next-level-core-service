import { Building, Room } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';

import { roomService } from './room.service';
import { roomFilterableFields } from './room.variable';

export const createRoom: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const data = req.body;
		const result = await roomService.createRoom(data);

		sendResponse<Room>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Room create successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllRooms: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const filters = pick(req.query, roomFilterableFields);
		const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

		const result = await roomService.getAllRooms(filters, options);

		sendResponse<Room[]>(res, {
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

export const getRoomById: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await roomService.getRoomById(id);

		sendResponse<Room>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Room fetch successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const updateRoom: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;
		const data = req.body as Partial<Building>;

		const result = await roomService.updateRoom(id, data);

		sendResponse<Room>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Room update successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteRoom: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { id } = req.params;

		const result = await roomService.deleteRoom(id);

		sendResponse<Room>(res, {
			statusCode: httpStatus.OK,
			status: 'success',
			message: 'Room delete successfully',
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
