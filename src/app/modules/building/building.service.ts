import { Building, Prisma } from '@prisma/client';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { IBuildingFilterRequest } from './building.interface';
import { buildingSearchableFields } from './building.variable';

const createBuilding = async (data: Building): Promise<Building> => {
	const result = await prisma.building.create({
		data,
	});

	return result;
};

const getAllBuildings = async (
	filters: IBuildingFilterRequest,
	pageOptions: IPageOtions
): Promise<IGenericResponse<Building[]>> => {
	const { searchTerm } = filters;

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
			OR: buildingSearchableFields.map((field) => ({
				[field]: {
					contains: searchTerm,
					mode: 'insensitive',
				},
			})),
		});
	}

	const whereConditons: Prisma.BuildingWhereInput =
		andCondition.length > 0 ? { AND: andCondition } : {};

	const result = await prisma.building.findMany({
		where: whereConditons,
		skip,
		take: limit,
		orderBy: sortCondition,
	});

	const total = await prisma.building.count();

	return {
		data: result,
		meta: {
			total,
			page,
			limit,
		},
	};
};

const getBuildingById = async (id: string): Promise<Building | null> => {
	const result = await prisma.building.findUnique({
		where: { id },
	});

	return result;
};

const updateBuilding = async (id: string, data: Partial<Building>): Promise<Building> => {
	const result = await prisma.building.update({
		where: { id },
		data,
	});

	return result;
};

const deleteBuilding = async (id: string): Promise<Building> => {
	const result = await prisma.building.delete({
		where: { id },
	});

	return result;
};

export const buildingService = {
	createBuilding,
	getAllBuildings,
	getBuildingById,
	updateBuilding,
	deleteBuilding,
};
