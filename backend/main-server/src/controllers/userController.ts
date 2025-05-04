// #region imports
import { Request, Response } from "express";
import UserService from "../services/Userservice";
import { error } from "console";
// #endregion

// #region functions
const service = new UserService();

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  debugger;
  try {
    const { data } = req.body;
    data.id = req.params["id"];
    const user = await service.update(data);
    res.status(201).json(user);
  } catch (error) {
    console.log("Error updating user", error);
  }
};
export const ReactivateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  debugger;
  try {
    const { id } = req.body;
    const Id = parseInt(id);
    const result = await service.ReactivateUser(Id);
    if (result instanceof Error) {
      res.status(404).json({
        message: result.message,
      });
    } else {
      res.status(201).json({
        message: "User Rectivated Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const ActiveUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  debugger;
  try {
    const { id, isReactivation } = req.body;
    const Id = parseInt(id);
    const reactivation = Boolean(isReactivation);
    const result = await service.ActiveUser(Id, reactivation);
    if (result instanceof Error) {
      res.status(400).json({
        message: result.message,
      });
    } else {
      res.status(200).json({
        message: "User account activated successfully!",
        user: result,
      });
    }
  } catch (error) {
    console.error("Error in activateUserController:", error);
    res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};
export const ResendActivationLink = async (
  req: Request,
  res: Response
): Promise<void> => {
  debugger;
  try {
    const { id } = req.body;
    const Id = parseInt(id);
    const result = await service.ResendActivationLink(Id);
    if (result) {
      res.status(200).json({
        message: "Activation link was already sent!",
      });
    } else {
      res.status(400).json({
        message:
          "There was an error sending the activation link. Please try again later.",
        user: result,
      });
    }
  } catch (error) {
    console.error("Error in ResendActivationLink:", error);
    res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};
export const ForgotPasswordLink = async (req: Request,res: Response): Promise<void> => {
  debugger
  try {
    const { email } = req.body;
    const result = await service.ForgotPasswordLink(email);
    if (result) {
      res.status(200).json({
        message: "Password reset link was sent successfully!",
        user: result,
      });
    } else {
      res.status(400).json({
        message:
          "There was an error sending the password reset link. Please try again later.",
        user: result,
      });
    }
  } catch (error) {
    console.error("Error in ResetPasswordLink:", error);
    res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};
export const getUser = async (req: Request, res: Response): Promise<void> => {
  debugger
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
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the users." });
  }
};
export const login = async (req: Request, res: Response) => {
  debugger;
  const { username, password } = req.body;
  try {
    const user = await service.getByUsername(username, password);
    user.password = null;
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the users..." });
  }
};
export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const userId = await service.delete(id);
    userId !== undefined
      ? res
          .status(201)
          .json({
            done: true,
            value: { userId, message: "succesfuly deleted" },
          })
      : res
          .status(501)
          .json({ done: false, value: { message: "failed to delete" } });
  } catch (error) {
    console.log("Error deleting user", error);
    res
      .status(500)
      .json({ error: "An Error ocurred while trying to delete the user" });
  }
};
export const checkUserName = async (
  req: Request,
  res: Response
): Promise<void> => {
  debugger
  try {
    const { username } = req.body;
    const data = await service.checkUserName(username);
    res.status(200).json({ data });
  } catch (error) {
    console.log("Error checking username", error);
    res
      .status(500)
      .json({ error: "An error occurred while checking the username..." });
  }
};

export const changePassword = async (req: Request, res: Response): Promise<void> => {
  debugger
  try {
    const { id, password} = req.body as { id:number, password:string };
   
    const result = await service.ChangePassword(id, password);
    if (result instanceof Error) {
      res.status(400).json({
        message: result.message,
      });
    } else {
      res.status(200).json({
        message: "password updated successfully!",
        user: result,
      });
    }
  } catch (error) {
    console.log("Error changing password", error);
    res
      .status(500)
  }
}
export default {
  getUsers,
  getUser,
  updateUser,
  login,
  checkUserName,
  ActiveUser,
  ReactivateUser,
  ResendActivationLink,
 ForgotPasswordLink,
};
// #endregion
