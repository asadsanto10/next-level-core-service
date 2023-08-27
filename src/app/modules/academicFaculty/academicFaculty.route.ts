import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import { createFaculty, getAcademicFacultyById, getAllAcademicFacultys } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';

// prettier-ignore

const router = express.Router();

router.get('/', getAllAcademicFacultys);
router.get('/:id', getAcademicFacultyById);

router.post('/', validateRequest(academicFacultyValidation.create), createFaculty);

export const academicFacultyRoutes = router;
