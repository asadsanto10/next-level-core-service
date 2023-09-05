import { Prisma, SemesterRegistration, SemesterRegistrationStatus } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import prisma from '../../../shared/prisma';
import { ISemesterRegistrationFilterRequest } from './semesterRegistration.interface';
import {
	semesterRegistrationRelationalFields,
	semesterRegistrationRelationalFieldsMapper,
	semesterRegistrationSearchableFields,
} from './semesterRegistration.variable';

const createSemesterReg = async (data: SemesterRegistration): Promise<SemesterRegistration> => {
	const isSemesterRegistrationUpcomingOrOngoing = await prisma.semesterRegistration.findFirst({
		where: {
			OR: [
				{
					status: SemesterRegistrationStatus.UPCOMING,
				},

				{
					status: SemesterRegistrationStatus.ONGOING,
				},
			],
		},
	});

	if (isSemesterRegistrationUpcomingOrOngoing) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			`Thers is already an ${isSemesterRegistrationUpcomingOrOngoing.status} registration.`
		);
	}
	const result = await prisma.semesterRegistration.create({ data });
	return result;
};

const getAllSemesterReg = async (
	filters: ISemesterRegistrationFilterRequest,
	pageOptions: IPageOtions
): Promise<IGenericResponse<SemesterRegistration[]>> => {
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
				if (semesterRegistrationRelationalFields.includes(field)) {
					return {
						[semesterRegistrationRelationalFieldsMapper[field]]: { id: value },
					};
				}
				return { [field]: { equals: value } };
			}),
		});
	}

	const whereConditons: Prisma.SemesterRegistrationWhereInput =
		andCondition.length > 0 ? { AND: andCondition } : {};

	const result = await prisma.semesterRegistration.findMany({
		where: whereConditons,
		skip,
		take: limit,
		orderBy: sortCondition,
		include: {
			academicSemester: true,
		},
	});

	const total = await prisma.semesterRegistration.count({
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

const getByIdSemesterReg = async (id: string): Promise<SemesterRegistration | null> => {
	const result = await prisma.semesterRegistration.findUnique({
		where: { id },
		include: {
			academicSemester: true,
		},
	});

	return result;
};

const deleteCource = async (id: string): Promise<SemesterRegistration> => {
	const result = await prisma.semesterRegistration.delete({
		where: {
			id,
		},
		include: {
			academicSemester: true,
		},
	});
	return result;
};

export const semesterRegiService = {
	createSemesterReg,
	getAllSemesterReg,
	getByIdSemesterReg,
	deleteCource,
};
