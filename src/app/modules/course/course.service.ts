/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import { Course, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { ICourseCreateData, ICourseFilterRequest } from './course.interface';
import { courseSearchableFields } from './course.variable';

const createCourse = async (data: ICourseCreateData): Promise<unknown> => {
	const { preRequisiteCourses, ...courseData } = data;
	// console.log(data);

	const newCourse = await prisma.$transaction(async (tx) => {
		const result = await tx.course.create({
			data: courseData,
		});
		if (!result) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create  course');
		}

		if (preRequisiteCourses && preRequisiteCourses.length > 0) {
			for (let i = 0; i < preRequisiteCourses.length; i++) {
				await tx.courseToPrerequisite.create({
					data: {
						courseId: result.id,
						preRequisiteId: preRequisiteCourses[i].courseId,
					},
				});
			}
		}
		return result;
	});

	if (newCourse) {
		const response = await prisma.course.findUnique({
			where: {
				id: newCourse.id,
			},
			include: {
				preRequisite: {
					include: {
						preRequisite: true,
					},
				},
				preRequisiteFor: {
					include: {
						course: true,
					},
				},
			},
		});
		return response;
	}
	// const result = await prisma.course.create({
	// 	data: courseData,
	// });

	// console.log(newCourse);
	// return newCourse;
	throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
};

const getAllCources = async (
	filters: ICourseFilterRequest,
	pageOptions: IPageOtions
): Promise<IGenericResponse<Course[]>> => {
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
			OR: courseSearchableFields.map((field) => ({
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

	const whereConditons: Prisma.CourseWhereInput =
		andCondition.length > 0 ? { AND: andCondition } : {};

	const result = await prisma.course.findMany({
		where: whereConditons,
		skip,
		take: limit,
		orderBy: sortCondition,
		include: {
			preRequisite: {
				include: {
					preRequisite: true,
				},
			},
			preRequisiteFor: {
				include: {
					course: true,
				},
			},
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

const getCourceById = async (id: string): Promise<Course | null> => {
	const result = await prisma.course.findUnique({
		where: { id },
		include: {
			preRequisite: {
				include: {
					preRequisite: true,
				},
			},
			preRequisiteFor: {
				include: {
					course: true,
				},
			},
		},
	});

	return result;
};

// const updateCource = async (id: string, data: Partial<Course>): Promise<Course> => {
// 	const result = await prisma.room.update({
// 		where: { id },
// 		data,
// 		include: {
// 			building: true,
// 		},
// 	});

// 	return result;
// };

const deleteCource = async (id: string): Promise<Course> => {
	await prisma.courseToPrerequisite.deleteMany({
		where: {
			OR: [
				{
					courseId: id,
				},
				{
					preRequisiteId: id,
				},
			],
		},
	});

	const result = await prisma.course.delete({
		where: { id },
	});

	return result;
};

export const courceService = {
	createCourse,
	getAllCources,
	getCourceById,
	// updateCource,
	deleteCource,
};
