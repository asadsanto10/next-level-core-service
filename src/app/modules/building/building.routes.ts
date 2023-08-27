import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import {
  createBuilding,
  deleteBuilding,
  getAllBuildings,
  getBuildingById,
  updateBuilding,
} from './building.controller';
import { buildingValidations } from './building.validation';

const router = express.Router();

router.get('/', getAllBuildings);

router.get('/:id', getBuildingById);

router.post(
	'/',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	validateRequest(buildingValidations.create),
	createBuilding
);

router.patch(
	'/:id',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	validateRequest(buildingValidations.update),
	updateBuilding
);
router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), deleteBuilding);

export const buildingRoutes = router;
