import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import {
  createSemester,
  getAcademicSemesterById,
  getAllAcademicSemesters,
} from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';
// prettier-ignore

const router = express.Router();

router.get('/', getAllAcademicSemesters);
router.get('/:id', getAcademicSemesterById);

router.post('/', validateRequest(academicSemesterValidation.create), createSemester);

export const academicSemestersRoutes = router;
