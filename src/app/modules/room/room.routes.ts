import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
// prettier-ignore
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom } from './room.controller';
import { roomValidation } from './room.validation';

const router = express.Router();

router.get('/', getAllRooms);

router.get('/:id', getRoomById);

router.post(
	'/',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	validateRequest(roomValidation.create),
	createRoom
);

router.patch(
	'/:id',
	auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
	validateRequest(roomValidation.update),
	updateRoom
);
router.delete('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), deleteRoom);

export const roomRoutes = router;
