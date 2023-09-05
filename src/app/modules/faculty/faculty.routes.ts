import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import {
  assignCourses,
  createFaculty,
  deleteFaculty,
  getAllfacultys,
  getfacultyById,
  removeCourses,
  updateFaculty,
} from './faculty.controller';
import { facultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/', getAllfacultys);

router.get('/:id', getfacultyById);

router.post('/', validateRequest(facultyValidation.create), createFaculty);

router.patch(
	'/:id',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	validateRequest(facultyValidation.update),
	updateFaculty
);
router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), deleteFaculty);

// assign-courses
router.post(
	'/:facultyId/assign-courses',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	validateRequest(facultyValidation.assignOrRemoveCourses),
	assignCourses
);

router.delete(
	'/:facultyId/remove-courses',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	removeCourses
);

export const facultyRoutes = router;
