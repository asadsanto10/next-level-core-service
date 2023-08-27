import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import {
  createSemester,
  deleteSemester,
  getAcademicSemesterById,
  getAllAcademicSemesters,
  updateSemester,
} from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.get('/', getAllAcademicSemesters);
router.get('/:id', getAcademicSemesterById);

router.post('/', validateRequest(academicSemesterValidation.create), createSemester);

router.patch(
	'/:id',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	validateRequest(academicSemesterValidation.update),
	updateSemester
);
router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), deleteSemester);
export const academicSemestersRoutes = router;
