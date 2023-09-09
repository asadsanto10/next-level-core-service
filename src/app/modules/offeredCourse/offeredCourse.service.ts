import { OfferedCourse, Prisma } from '@prisma/client';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/uitls';
import { semesterRegistrationSearchableFields } from '../semesterRegistration/semesterRegistration.variable';
import { ICreateOfferedCourse, IOfferedCourseFilterRequest } from './offeredCourse.interface';
import {
	offeredCourseRelationalFields,
	offeredCourseRelationalFieldsMapper,
} from './offeredCourse.variable';

const createOfferedCourse = async (data: ICreateOfferedCourse): Promise<OfferedCourse[]> => {
	const { academicDepartmentId, semesterRegistrationId, courseIds } = data;

	const result: Array<OfferedCourse> = [];

	await asyncForEach(courseIds, async (courseId: string) => {
		const existOfferCourse = await prisma.offeredCourse.findFirst({
			where: {
				academicDepartmentId,
				semesterRegistrationId,
				courseId,
			},
		});

		if (!existOfferCourse) {
			const generateOfferCourse = await prisma.offeredCourse.create({
				data: {
					academicDepartmentId,
					semesterRegistrationId,
					courseId,
				},
				include: {
					academicDepartment: true,
					semesterRegistration: true,
					course: true,
				},
			});
			result.push(generateOfferCourse);
		}
	});

	return result;
};

const getAllOfferedCourse = async (
	filters: IOfferedCourseFilterRequest,
	pageOptions: IPageOtions
): Promise<IGenericResponse<OfferedCourse[]>> => {
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
			OR: semesterRegistrationSearchableFields.map((field) => ({
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
				if (offeredCourseRelationalFields.includes(field)) {
					return {
						[offeredCourseRelationalFieldsMapper[field]]: { id: value },
					};
				}
				return { [field]: { equals: value } };
			}),
		});
	}

	const whereConditons: Prisma.OfferedCourseWhereInput =
		andCondition.length > 0 ? { AND: andCondition } : {};

	const result = await prisma.offeredCourse.findMany({
		where: whereConditons,
		skip,
		take: limit,
		orderBy: sortCondition,
		include: {
			semesterRegistration: true,
			course: true,
			academicDepartment: true,
		},
	});

	const total = await prisma.offeredCourse.count({
		where: whereConditons,
	});

	return {
		data: result,
		meta: {
			total,
			page,
			limit,
		},
	};
};

const getByIdOfferedCourse = async (id: string): Promise<OfferedCourse | null> => {
	const result = await prisma.offeredCourse.findUnique({
		where: { id },
		include: {
			semesterRegistration: true,
			course: true,
			academicDepartment: true,
		},
	});

	return result;
};

const updateOfferedCourse = async (
	id: string,
	data: Partial<OfferedCourse>
): Promise<OfferedCourse | null> => {
	const result = await prisma.offeredCourse.update({
		where: {
			id,
		},
		data,
		include: {
			semesterRegistration: true,
			course: true,
			academicDepartment: true,
		},
	});
	return result;
};

const deleteOfferedCourse = async (id: string): Promise<OfferedCourse> => {
	const result = await prisma.offeredCourse.delete({
		where: {
			id,
		},
		include: {
			semesterRegistration: true,
			course: true,
			academicDepartment: true,
		},
	});
	return result;
};

export const offeredCourseService = {
	createOfferedCourse,
	getAllOfferedCourse,
	getByIdOfferedCourse,
	updateOfferedCourse,
	deleteOfferedCourse,
};
