import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from './student.controller';
import { studentValidation } from './student.validation';

const router = express.Router();

router.get('/', getAllStudents);

router.get('/:id', getStudentById);

router.post(
	'/',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	validateRequest(studentValidation.create),
	createStudent
);

router.patch(
	'/:id',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	validateRequest(studentValidation.update),
	updateStudent
);
router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), deleteStudent);

export const studentRoutes = router;
