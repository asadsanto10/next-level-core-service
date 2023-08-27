import express, { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { academicDepartmentsRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicSemestersRoutes } from '../modules/academicSemester/academicSemester.route';
import { facultyRoutes } from '../modules/faculty/faculty.routes';
import { studentRoutes } from '../modules/student/studentRoute';

const router = express.Router();

router.get('/health', (_req, res) => {
	res.json({ message: 'All ok' });
});

router.use('/academic-semesters', academicSemestersRoutes);
router.use('/academic-faculties', academicFacultyRoutes);
router.use('/academic-departments', academicDepartmentsRoutes);
router.use('/faculties', facultyRoutes);
router.use('/students', studentRoutes);

// not found route
router.use((req: Request, res: Response, next: NextFunction) => {
	res.status(httpStatus.NOT_FOUND).json({
		status: false,
		message: 'Route not found',
		errorMessage: [
			{
				path: req.originalUrl,
				message: 'API not found!',
			},
		],
	});
	next();
});

export default router;
