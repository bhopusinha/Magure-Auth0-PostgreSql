import { RequestHandler } from "express";
import AppDataSource from "../../config/database.config";
import { User } from "./user.entity";

interface DatabaseError extends Error {
  code: string;
}

interface Id {
  id: number;
  name: string;
}

export const createUser: RequestHandler = async (req, res) => {
  try {
    const { name, email } = req.body;

    const userRepository = await AppDataSource.getRepository(User);
    const user = new User();

    user.name = name;
    user.email = email;

    await userRepository.save(user);
    const saveData = await userRepository.find();

    res.status(200).json({
      success: true,
      data: saveData,
    });
  } catch (error) {
    const dbError = error as DatabaseError;

    if (dbError.code === "23505") {
      // PostgreSQL unique violation error code
      res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

export const getUser: RequestHandler = async (req, res) => {
  try {
    const userRepository = await AppDataSource.getRepository(User);

    const getAllUser = await userRepository.find();

    res.status(200).json({
      success: true,
      data: getAllUser,
    });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateUser: RequestHandler<Id, unknown, Id, unknown> = async (
  req,
  res
) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const userRepository = await AppDataSource.getRepository(User);

    const checkExist = await userRepository.findOneBy({ id: id });

    if (!checkExist) {
      res.status(402).send("user not found!");
    } else {
      checkExist.name = name;

      await userRepository.save(checkExist);

      res.status(200).send("user updated successfully!");
    }
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const userDelete: RequestHandler<Id,unknown,unknown,unknown> = async (req, res) => {
  const { id } = req.params;

  try {
    const userRepository = await AppDataSource.getRepository(User);

    const checkExist = await userRepository.findOneBy({ id: id });

    if (!checkExist) {
      res.status(402).send("user not found!");
    } else {

      await userRepository.remove(checkExist);

      res.status(200).send("user removed successfully!");
    }
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
