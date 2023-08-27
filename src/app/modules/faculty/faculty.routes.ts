import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { createFaculty, getAllfacultys, getfacultyById } from './faculty.controller';
import { facultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/', getAllfacultys);

router.get('/:id', getfacultyById);

router.post('/', validateRequest(facultyValidation.create), createFaculty);

export const facultyRoutes = router;
