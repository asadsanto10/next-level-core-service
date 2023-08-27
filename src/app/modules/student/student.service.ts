import { Prisma, Student } from '@prisma/client';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { IStudentFilterRequest } from './student.interface';
import {
	studentRelationalFields,
	studentRelationalFieldsMapper,
	studentSearchableFields,
} from './student.variable';

const createStudent = async (data: Student): Promise<Student> => {
	const result = await prisma.student.create({
		data,
	});

	return result;
};

const getAllStudents = async (
	filters: IStudentFilterRequest,
	pageOptions: IPageOtions
): Promise<IGenericResponse<Student[]>> => {
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
			OR: studentSearchableFields.map((field) => ({
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
				if (studentRelationalFields.includes(field)) {
					return {
						[studentRelationalFieldsMapper[field]]: { id: value },
					};
				}
				return { [field]: { equals: value } };
			}),
		});
	}

	const whereConditons: Prisma.StudentWhereInput =
		andCondition.length > 0 ? { AND: andCondition } : {};

	const result = await prisma.student.findMany({
		where: whereConditons,
		skip,
		take: limit,
		orderBy: sortCondition,
		include: {
			academicFaculty: true,
			academicDepartment: true,
		},
	});

	const total = await prisma.student.count();

	return {
		data: result,
		meta: {
			total,
			page,
			limit,
		},
	};
};

const getStudentById = async (id: string): Promise<Student | null> => {
	const result = await prisma.student.findUnique({
		where: { id },
		include: {
			academicFaculty: true,
			academicDepartment: true,
			academicSemester: true,
		},
	});

	return result;
};

export const studentService = { createStudent, getAllStudents, getStudentById };
