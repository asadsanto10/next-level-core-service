import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import {
  createSemesterReg,
  deleteSemesterReg,
  getAllSemesterReg,
  getByIdSemesterReg,
  updateSemesterReg,
} from './semesterRegistration.controller';

import { semesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();

router.get('/', getAllSemesterReg);
router.get('/:id', getByIdSemesterReg);

router.post(
	'/',
	validateRequest(semesterRegistrationValidation.semesterRegistrarionCreate),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	createSemesterReg
);

router.patch(
	'/:id',
	validateRequest(semesterRegistrationValidation.semesterRegistrarionUpdate),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	updateSemesterReg
);

router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), deleteSemesterReg);

export const semesterRegistrationRoutes = router;
