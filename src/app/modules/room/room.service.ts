import { Prisma, Room } from '@prisma/client';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { IRoomFilterRequest } from './room.interface';
// prettier-ignore
import {
  roomRelationalFields,
  roomRelationalFieldsMapper,
  roomSearchableFields,
} from './room.variable';

const createRoom = async (data: Room): Promise<Room> => {
	const result = await prisma.room.create({
		data,
		include: {
			building: true,
		},
	});

	return result;
};

const getAllRooms = async (
	filters: IRoomFilterRequest,
	pageOptions: IPageOtions
): Promise<IGenericResponse<Room[]>> => {
	const { searchTerm, ...filterData } = filters;

	const options = calculatePagination(pageOptions);
	const page = options.page as number;
	const limit = options.limit as number;
	const skip = options.skip as number;

	const sortCondition: { [key: string]: string } = {};

	const { sortBy, sortOrder } = options;

	if (sortBy && sortOrder) {
		sortCondition[sortBy] = sortOrder;
	} else {
		sortCondition.createdAt = 'desc';
	}

	const andCondition = [];

	if (searchTerm) {
		andCondition.push({
			OR: roomSearchableFields.map((field) => ({
				[field]: {
					contains: searchTerm,
					mode: 'insensitive',
				},
			})),
		});
	}

	if (Object.keys(filterData).length > 0) {
		andCondition.push({
			AND: Object.entries(filterData).map(([field, value]) => {
				if (roomRelationalFields.includes(field)) {
					return {
						[roomRelationalFieldsMapper[field]]: { id: value },
					};
				}
				return { [field]: { equals: value } };
			}),
		});
	}

	const whereConditons: Prisma.RoomWhereInput =
		andCondition.length > 0 ? { AND: andCondition } : {};

	const result = await prisma.room.findMany({
		where: whereConditons,
		skip,
		take: limit,
		orderBy: sortCondition,
		include: {
			building: true,
		},
	});

	const total = await prisma.room.count();

	return {
		data: result,
		meta: {
			total,
			page,
			limit,
		},
	};
};

const getRoomById = async (id: string): Promise<Room | null> => {
	const result = await prisma.room.findUnique({
		where: { id },
		include: {
			building: true,
		},
	});

	return result;
};

const updateRoom = async (id: string, data: Partial<Room>): Promise<Room> => {
	const result = await prisma.room.update({
		where: { id },
		data,
		include: {
			building: true,
		},
	});

	return result;
};

const deleteRoom = async (id: string): Promise<Room> => {
	const result = await prisma.room.delete({
		where: { id },
		include: {
			building: true,
		},
	});

	return result;
};

export const roomService = {
	createRoom,
	getAllRooms,
	getRoomById,
	updateRoom,
	deleteRoom,
};
