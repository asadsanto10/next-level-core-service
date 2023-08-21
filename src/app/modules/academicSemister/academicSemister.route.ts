import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { createSemester } from './academicSemister.controller';
import { academicSemesterValidation } from './academicSemister.validation';
// prettier-ignore

const router = express.Router();

router.post('/', validateRequest(academicSemesterValidation.create), createSemester);

export const academicSemestersRoutes = router;
