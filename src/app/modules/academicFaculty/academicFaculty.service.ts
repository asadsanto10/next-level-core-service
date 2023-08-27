import { AcademicFaculty, Prisma } from '@prisma/client';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { IAcademicFacultyFilterRequest } from './academicFaculty.interface';
import { academicFacultySearchableFields } from './academicFaculty.variable';

const createFaculty = async (data: AcademicFaculty): Promise<AcademicFaculty> => {
	const result = await prisma.academicFaculty.create({
		data,
	});

	return result;
};

const getAllAcademicFacultys = async (
	filters: IAcademicFacultyFilterRequest,
	pageOptions: IPageOtions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
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
			OR: academicFacultySearchableFields.map((field) => ({
				[field]: {
					contains: searchTerm,
					mode: 'insensitive',
				},
			})),
		});
	}

	if (Object.keys(filterData).length > 0) {
		andCondition.push({
			AND: Object.entries(filterData).map(([field, value]) => ({ [field]: { equals: value } })),
		});
	}

	const whereConditons: Prisma.AcademicFacultyWhereInput =
		andCondition.length > 0 ? { AND: andCondition } : {};

	const result = await prisma.academicFaculty.findMany({
		where: whereConditons,
		skip,
		take: limit,
		orderBy: sortCondition,
	});

	const total = await prisma.academicFaculty.count();

	return {
		data: result,
		meta: {
			total,
			page,
			limit,
		},
	};
};

const getAcademicFacultyById = async (id: string): Promise<AcademicFaculty | null> => {
	const result = await prisma.academicFaculty.findUnique({ where: { id } });

	return result;
};

export const academicFacultyService = {
	createFaculty,
	getAllAcademicFacultys,
	getAcademicFacultyById,
};
