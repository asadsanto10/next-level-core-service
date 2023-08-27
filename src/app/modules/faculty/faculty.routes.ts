import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import {
  createFaculty,
  deleteFaculty,
  getAllfacultys,
  getfacultyById,
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
export const facultyRoutes = router;
