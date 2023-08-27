import { Faculty, Prisma } from '@prisma/client';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { IFacultyFilterRequest } from './faculty.interface';
// prettier-ignore
import {
	facultyRelationalFields,
	facultyRelationalFieldsMapper,
	facultySearchableFields,
} from './faculty.variable';

const createFaculty = async (data: Faculty): Promise<Faculty> => {
	const result = await prisma.faculty.create({
		data,
		include: {
			academicFaculty: true,
			academicDepartment: true,
		},
	});

	return result;
};

const getAllfacultys = async (
	filters: IFacultyFilterRequest,
	pageOptions: IPageOtions
): Promise<IGenericResponse<Faculty[]>> => {
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
			OR: facultySearchableFields.map((field) => ({
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
				if (facultyRelationalFields.includes(field)) {
					return {
						[facultyRelationalFieldsMapper[field]]: { id: value },
					};
				}
				return { [field]: { equals: value } };
			}),
		});
	}

	const whereConditons: Prisma.FacultyWhereInput =
		andCondition.length > 0 ? { AND: andCondition } : {};

	const result = await prisma.faculty.findMany({
		where: whereConditons,
		skip,
		take: limit,
		orderBy: sortCondition,
		include: {
			academicFaculty: true,
			academicDepartment: true,
		},
	});

	const total = await prisma.faculty.count();

	return {
		data: result,
		meta: {
			total,
			page,
			limit,
		},
	};
};

const getfacultyById = async (id: string): Promise<Faculty | null> => {
	const result = await prisma.faculty.findUnique({
		where: { id },
		include: {
			academicFaculty: true,
			academicDepartment: true,
		},
	});

	return result;
};

export const facultyService = { createFaculty, getAllfacultys, getfacultyById };
