// #region imports
import { Request, Response } from "express";
import { UserService } from "../services/Userservice.js";
import bcrypt from 'bcrypt';

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
    if (!user) {
      res.status(200).json(user)
      //return;
    }

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
    /*res
      .status(500)
      .json({ error: "An error occurred while fetching the users." });*/
  }
};

export const login = async (req: Request, res: Response)=> {
  const { username, password } = req.body;
  let isAuthorized = false;
  try {
    const user = await service.getByUsername(username,password);
    isAuthorized =(!user && (await bcrypt.compare(password, user.password)))
    if(!isAuthorized){
      res.status(401).send('Invalid Credentials')
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the users." });
  }
};

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
export default {
  getUsers,
  getUser,
  updateUser,
  login
};

// #endregion
