import { RequestHandler } from "express";
import pool from "../../config/database.config";
import {
  addStudents,
  checkEmailExist,
  deleteStudentById,
  getAllStudents,
  getStudentById,
  updateStudentById,
} from "../../utils/queries";
import { studentType } from "../../types/student";

export const getStudents: RequestHandler = async (req, res) => {
  pool.query(getAllStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json({
      success: true,
      data: results.rows,
    });
  });
};

export const createStudents: RequestHandler<
  unknown,
  unknown,
  studentType,
  unknown
> = async (req, res) => {
  const { name, email, age, dob } = req.body;
  pool.query(checkEmailExist, [email], (error, result) => {
    if (result.rows.length) {
      return res.send("Email already exists. ");
    }
  });

   
  pool.query(addStudents, [name, email, age, dob], (error, results) => {
    if (error) throw error;
    res.status(201).json({
      success: true,
      data: results.rows,
    });
  });
};

export const getById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  pool.query(getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(201).json({
        success: true,
        data: results.rows,
      });
  });
};

export const updateById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  pool.query(getStudentById, [id], (error, results) => {
    if (error) throw error;

    const studentFound = !results.rows.length;
    if (studentFound) {
      return res.status(401).send("student does not exist on this id.");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pool.query(updateStudentById, [name, id], (error, results) => {
      if (error) throw error;

      res.status(200).send("students updated successfully!");
    });
  });
};

export const deleteById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  pool.query(getStudentById, [id], (error, results) => {
    if (error) throw error;

    const studentFound = !results.rows.length;
    if (studentFound) {
      return res.status(401).send("student does not exist on this id.");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pool.query(deleteStudentById, [id], (error, results) => {
      if (error) throw error;

      res.status(200).send("students removed successfully!");
    });
  });
};
