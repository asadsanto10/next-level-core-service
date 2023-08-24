import { AcademicSemester, Prisma, PrismaClient } from '@prisma/client';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import { IAcademicSemeterFilterRequest } from './academicSemester.interface';
import { AcademicSemesterSearchAbleFields } from './academicSemester.variable';

const prisma = new PrismaClient();

const createSemester = async (data: AcademicSemester): Promise<AcademicSemester> => {
	const result = await prisma.academicSemester.create({
		data,
	});

	return result;
};

const getAllAcademicSemesters = async (
	filters: IAcademicSemeterFilterRequest,
	pageOptions: IPageOtions
): Promise<IGenericResponse<AcademicSemester[]>> => {
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
			OR: AcademicSemesterSearchAbleFields.map((field) => ({
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

	const whereConditons: Prisma.AcademicSemesterWhereInput =
		andCondition.length > 0 ? { AND: andCondition } : {};

	const result = await prisma.academicSemester.findMany({
		where: whereConditons,
		skip,
		take: limit,
		orderBy: sortCondition,
	});

	const total = await prisma.academicSemester.count();

	return {
		data: result,
		meta: {
			total,
			page,
			limit,
		},
	};
};

export const academicSemestersService = { createSemester, getAllAcademicSemesters };
