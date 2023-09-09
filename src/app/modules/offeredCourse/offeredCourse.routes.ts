import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import {
	createOfferedCourse,
	deleteOfferedCourse,
	getAllOfferedCourse,
	getByIdOfferedCourse,
	updateOfferedCourse,
} from './offeredCourse.controller';
import { offeredCourseValidation } from './offeredCourse.validation';

const router = express.Router();

router.get('/', getAllOfferedCourse);
router.get('/:id', getByIdOfferedCourse);

router.post(
	'/',
	validateRequest(offeredCourseValidation.create),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	createOfferedCourse
);

router.patch(
	'/:id',
	validateRequest(offeredCourseValidation.update),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	updateOfferedCourse
);

router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), deleteOfferedCourse);

export const offeredCourseRoutes = router;
