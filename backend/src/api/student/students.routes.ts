import { Router } from "express";
import { createStudents, deleteById, getById, getStudents, updateById } from "./student.controller";

const studentRouter= Router();

studentRouter.route('/').get(getStudents).post(createStudents);
studentRouter.route('/:id').get(getById).delete(deleteById).patch(updateById);


export default studentRouter;