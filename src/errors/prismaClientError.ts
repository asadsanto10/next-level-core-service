import { Prisma } from '@prisma/client';
import { IGenericErrorMessage } from '../interface/error.interface';
import { IGenericErrorResponse } from '../interface/errorResponse';

export const prismaClientError = (
	error: Prisma.PrismaClientKnownRequestError
): IGenericErrorResponse => {
	let errors: IGenericErrorMessage[] = [];
	let message = '';
	const statusCode = 400;

	if (error.code === 'P2025') {
		message = (error.meta?.cause as string) || 'Record not found!';
		errors = [
			{
				path: '',
				message,
			},
		];
	} else if (error.code === 'P2003') {
		if (error.message.includes('delete()` invocation:')) {
			message = 'Delete failed';
			errors = [
				{
					path: '',
					message,
				},
			];
		}
	}

	return {
		statusCode,
		message,
		errorMessage: errors,
	};
};
