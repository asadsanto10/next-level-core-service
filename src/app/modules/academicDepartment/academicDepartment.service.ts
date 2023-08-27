import { AcademicDepartment, Prisma } from '@prisma/client';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { IAcademicDepartmentFilterRequest } from './academicDepartment.interface';
// prettier-ignore
import {
	academicDepartmentRelationalFields,
	academicDepartmentRelationalFieldsMapper,
	academicDepartmentSearchableFields,
} from './academicDepartment.variable';

const createDepartment = async (data: AcademicDepartment): Promise<AcademicDepartment> => {
	const result = await prisma.academicDepartment.create({
		data,
		include: { academicFaculty: true },
	});

	return result;
};

const getAllAcademicDepartments = async (
	filters: IAcademicDepartmentFilterRequest,
	pageOptions: IPageOtions
): Promise<IGenericResponse<AcademicDepartment[]>> => {
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
			OR: academicDepartmentSearchableFields.map((field) => ({
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
				if (academicDepartmentRelationalFields.includes(field)) {
					return {
						[academicDepartmentRelationalFieldsMapper[field]]: { id: value },
					};
				}
				return { [field]: { equals: value } };
			}),
		});
	}

	const whereConditons: Prisma.AcademicDepartmentWhereInput =
		andCondition.length > 0 ? { AND: andCondition } : {};

	const result = await prisma.academicDepartment.findMany({
		where: whereConditons,
		skip,
		take: limit,
		orderBy: sortCondition,
		include: { academicFaculty: true },
	});

	const total = await prisma.academicDepartment.count();

	return {
		data: result,
		meta: {
			total,
			page,
			limit,
		},
	};
};

const getAcademicDepartmentById = async (id: string): Promise<AcademicDepartment | null> => {
	const result = await prisma.academicDepartment.findUnique({
		where: { id },
		include: { academicFaculty: true },
	});

	return result;
};

export const academicDepartmentService = {
	createDepartment,
	getAllAcademicDepartments,
	getAcademicDepartmentById,
};
