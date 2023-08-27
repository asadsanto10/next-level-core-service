import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import {
  createDepartment,
  getAcademicDepartmentById,
  getAllAcademicDepartments
} from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.get('/', getAllAcademicDepartments);
router.get('/:id', getAcademicDepartmentById);

router.post('/', validateRequest(academicDepartmentValidation.create), createDepartment);

export const academicDepartmentsRoutes = router;
