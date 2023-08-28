/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import prisma from '../../../shared/prisma';
import { ICourseCreateData } from './course.interface';

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

export const courceService = { createCourse };
