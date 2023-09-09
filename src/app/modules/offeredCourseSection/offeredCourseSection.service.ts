import { OfferedCourseSection, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { semesterRegistrationSearchableFields } from '../semesterRegistration/semesterRegistration.variable';
import { IOfferedCourseSectionFilterRequest } from './offeredCourseSection.interface';

import ApiError from '../../../errors/apiError';
// prettier-ignore
import {
  offeredCourseSectionRelationalFields,
  offeredCourseSectionRelationalFieldsMapper,
} from './offeredCourseSection.variable';

const createOfferedCourseSection = async (
	data: OfferedCourseSection
): Promise<OfferedCourseSection> => {
	const isExistOfferedCourse = await prisma.offeredCourse.findFirst({
		where: {
			id: data.offeredCourseId,
		},
	});

	if (!isExistOfferedCourse) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Offered Course does not exist!');
	}

	// eslint-disable-next-line no-param-reassign
	data.semesterRegistrationId = isExistOfferedCourse.semesterRegistrationId;

	const result = await prisma.offeredCourseSection.create({
		data,
	});
	return result;
};

const getAllOfferedCourseSection = async (
	filters: IOfferedCourseSectionFilterRequest,
	pageOptions: IPageOtions
): Promise<IGenericResponse<OfferedCourseSection[]>> => {
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
				if (offeredCourseSectionRelationalFields.includes(field)) {
					return {
						[offeredCourseSectionRelationalFieldsMapper[field]]: { id: value },
					};
				}
				return { [field]: { equals: value } };
			}),
		});
	}

	const whereConditons: Prisma.OfferedCourseSectionWhereInput =
		andCondition.length > 0 ? { AND: andCondition } : {};

	const result = await prisma.offeredCourseSection.findMany({
		where: whereConditons,
		skip,
		take: limit,
		orderBy: sortCondition,
		include: {
			offeredCourse: {
				include: {
					course: true,
				},
			},
		},
	});

	const total = await prisma.offeredCourseSection.count({
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

const getByIdOfferedCourseSection = async (id: string): Promise<OfferedCourseSection | null> => {
	const result = await prisma.offeredCourseSection.findUnique({
		where: { id },
		include: {
			offeredCourse: {
				include: {
					course: true,
				},
			},
		},
	});

	return result;
};

const updateOfferedCourseSection = async (
	id: string,
	data: Partial<OfferedCourseSection>
): Promise<OfferedCourseSection | null> => {
	const result = await prisma.offeredCourseSection.update({
		where: {
			id,
		},
		data,
		include: {
			offeredCourse: {
				include: {
					course: true,
				},
			},
		},
	});
	return result;
};

const deleteOfferedCourseSection = async (id: string): Promise<OfferedCourseSection> => {
	const result = await prisma.offeredCourseSection.delete({
		where: {
			id,
		},
		include: {
			offeredCourse: {
				include: {
					course: true,
				},
			},
		},
	});
	return result;
};

export const offeredCourseSectionService = {
	createOfferedCourseSection,
	getAllOfferedCourseSection,
	getByIdOfferedCourseSection,
	updateOfferedCourseSection,
	deleteOfferedCourseSection,
};
