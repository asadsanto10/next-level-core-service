import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export const createToken = (
	data: Record<string, unknown>,
	secret: Secret,
	expiresIn: string
): string => {
	return jwt.sign(data, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: Secret): JwtPayload => {
	return jwt.verify(token, secret) as JwtPayload;
};
