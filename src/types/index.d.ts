import { JwtPayload } from 'jsonwebtoken';

declare global {
	namespace Express {
		interface Request {
			user?: JwtPayload | null;
		}
	}
}

// declare namespace Express {
// 	export interface Request {
// 		user?: any;
// 	}
// }
