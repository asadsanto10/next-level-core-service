import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import { createCourse, deleteCource, getAllCources, getCourceById, updateCource } from './course.controller';
import { courseValidation } from './course.validation';

const router = express.Router();

router.get('/', getAllCources);

router.get('/:id', getCourceById);

router.post(
	'/',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	validateRequest(courseValidation.create),
	createCourse
);

router.patch(
	'/:id',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	validateRequest(courseValidation.update),
	updateCource
);

router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), deleteCource);

export const courseRoutes = router;
