// import mongoose from 'mongoose';
// import { IGenericErrorMessage } from '../interface/error.interface';
// import { IGenericErrorResponse } from '../interface/errorResponse';

// export const castErrorHandler = (error: mongoose.Error.CastError): IGenericErrorResponse => {
// 	const errors: IGenericErrorMessage[] = [
// 		{
// 			path: error.path,
// 			message: `Invalid ${error.path}`,
// 		},
// 	];
// 	const statusCode = 400;
// 	return {
// 		statusCode,
// 		message: 'Cast error',
// 		errorMessage: errors,
// 	};
// };
