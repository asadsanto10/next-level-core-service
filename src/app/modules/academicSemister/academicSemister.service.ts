import { AcademicSemister, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createSemester = async (data: AcademicSemister): Promise<AcademicSemister> => {
	const result = await prisma.academicSemister.create({
		data,
	});

	return result;
};

export const academicSemestersService = { createSemester };
