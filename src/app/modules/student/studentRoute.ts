import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';
import { createStudent, getAllStudents, getStudentById } from './student.controller';
import { studentValidation } from './student.validation';

const router = express.Router();

router.get('/', getAllStudents);

router.get('/:id', getStudentById);

router.post('/', validateRequest(studentValidation.create), createStudent);

export const studentRoutes = router;
