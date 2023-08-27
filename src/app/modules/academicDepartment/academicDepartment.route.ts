import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
// prettier-ignore
import {
  createDepartment,
  deleteDepartment,
  getAcademicDepartmentById,
  getAllAcademicDepartments,
  updateDepartment
} from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.get('/', getAllAcademicDepartments);
router.get('/:id', getAcademicDepartmentById);

router.post('/', validateRequest(academicDepartmentValidation.create), createDepartment);

router.patch(
	'/:id',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	validateRequest(academicDepartmentValidation.update),
	updateDepartment
);

router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), deleteDepartment);

export const academicDepartmentsRoutes = router;
