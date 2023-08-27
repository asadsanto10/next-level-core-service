import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
// prettier-ignore
import {
  createFaculty,
  deleteFaculty,
  getAcademicFacultyById,
  getAllAcademicFacultys,
  updateFaculty,
} from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.get('/', getAllAcademicFacultys);
router.get('/:id', getAcademicFacultyById);

router.post('/', validateRequest(academicFacultyValidation.create), createFaculty);
router.patch(
	'/:id',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	validateRequest(academicFacultyValidation.update),
	updateFaculty
);
router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), deleteFaculty);
export const academicFacultyRoutes = router;
