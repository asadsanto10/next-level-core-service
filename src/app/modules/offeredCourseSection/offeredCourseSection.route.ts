import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import {
  createOfferedCourseSection,
  deleteOfferedCourseSection,
  getAllOfferedCourseSection,
  getByIdOfferedCourseSection,
  updateOfferedCourseSection,
} from './offeredCourseSection.controller';
import { offeredCourseSectionValidation } from './offeredCourseSection.validation';

const router = express.Router();

router.get('/', getAllOfferedCourseSection);
router.get('/:id', getByIdOfferedCourseSection);

router.post(
	'/',
	validateRequest(offeredCourseSectionValidation.create),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	createOfferedCourseSection
);

router.patch(
	'/:id',
	validateRequest(offeredCourseSectionValidation.update),
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	updateOfferedCourseSection
);

router.delete(
	'/:id',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	deleteOfferedCourseSection
);

export const offeredCourseSectionRoutes = router;
