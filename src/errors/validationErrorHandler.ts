import { Prisma } from '@prisma/client';
import { IGenericErrorResponse } from '../interface/errorResponse';

const validationErrorHandler = (
	error: Prisma.PrismaClientValidationError
): IGenericErrorResponse => {
	const errors = [
		{
			path: '',
			message: error.message,
		},
	];

	const statusCode = 400;
	return {
		statusCode,
		message: 'Validation error',
		errorMessage: errors,
	};
};

export default validationErrorHandler;
