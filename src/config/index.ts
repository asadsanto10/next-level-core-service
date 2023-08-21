import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const variable = {
	nodeENV: process.env.NODE_ENV,
	port: process.env.PORT,
	dataBaseUrl: process.env.DATABASE_URL,
	defaultStudentPassword: process.env.DEFAULT_STUDENT_PASSWORD,
	defaultFacultyPassword: process.env.DEFAULT_FACULTY_PASSWORD,
	defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
	bycryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
	jwtSecret: process.env.JWT_SECRET,
	jwtExpireTime: process.env.JWT_EXPIRES_IN,
	jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
	jwtRefreshExpireTime: process.env.JWT_REFRESH_EXPIRES_IN,
};

export default variable;
