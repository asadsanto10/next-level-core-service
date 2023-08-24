import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { createSemester, getAllAcademicSemesters } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';
// prettier-ignore

const router = express.Router();

router.get('/', getAllAcademicSemesters);

router.post('/', validateRequest(academicSemesterValidation.create), createSemester);

export const academicSemestersRoutes = router;
