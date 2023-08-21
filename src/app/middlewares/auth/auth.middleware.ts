import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import variable from '../../../config';
import ApiError from '../../../errors/apiError';
import { verifyToken } from '../../../helpers/jwt.herlpers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const auth = (...role: string[]): any => {
	return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
		try {
			// get authorization token
			const authToken = req.headers.authorization;

			if (!authToken) {
				throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
			}
			const token = authToken.split(' ')[1];

			// verify token
			let verifiedUser = null;

			verifiedUser = verifyToken(token, variable.jwtSecret as Secret);

			req.user = verifiedUser; // role  , userid

			// check role
			if (role.length && !role.includes(verifiedUser.role)) {
				throw new ApiError(httpStatus.FORBIDDEN, 'Access Forbidden');
			}

			next();
		} catch (error) {
			next(error);
		}
	};
};

export default auth;
