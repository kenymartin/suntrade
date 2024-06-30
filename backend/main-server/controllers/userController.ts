// #region imports
import { Request, Response } from "express";
import { UserService } from "../services/Userservice.js";

import pkg from 'lodash';
const { isEmpty } = pkg;
// #endregion

// #region functions
const service = new UserService();
export const updateUser = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const { data } = req.body;
    const user = await service.update(data)
    res.status(201).json(user);
  } catch (error) {
    console.log("Error updating user", error);
    /*res
      .json({ error: "An error ocurred while updating. the user" });*/
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  
  try {
    const userId = req.params.id;
    const user = await service.getById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user..." });
  }
};

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await service.getAll();
    res.status(200).json(users)
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the users." });
  }
};

export const login = async (req: Request, res: Response) => {
  debugger
  const { username, password} = req.body;
  try {
    const user = await service.getByUsername(username,password);
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching the users..." });
  }
}

export const remove = async(req:Request, res:Response):Promise<void>=>{
  try {
    const id =req.params.id;
    const userId = await service.delete(id);
    !isEmpty(userId)
      ? res
          .status(201)
          .json({ done: true, value: { userId, message: "succesfuly deleted" } })
      : res
          .status(501)
          .json({ done: false, value: { message: "failed to delete" } });

  } catch (error) {
    console.log("Error deleting user", error)
    res.status(500).json({error:"An Error ocurred while trying to delete the user"})
  }
}
export const checkUserName = async(req:Request, res:Response):Promise<void>=>{
  try {
    const { username } = req.body;
    const data = await service.checkUserName(username);
    res.status(200).json({ data });
  } catch (error) {
    console.log("Error checking username", error);
    res.status(500).json({ error: "An error occurred while checking the username..." });
  }
}
export default {
  getUsers,
  getUser,
  updateUser,
  login,
  checkUserName
};

// #endregion
