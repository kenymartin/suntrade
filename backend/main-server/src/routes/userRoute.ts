import express, { json } from "express";
import { authByRole } from "../../../../backend/auth-server/src/middleware/auth";
import {
  ActiveUser,
  ResendActivationLink,
  ReactivateUser,
  remove,
  ForgotPasswordLink,
  changePassword
} from "../controllers/userController";
import {
  getUsers,
  login,
  updateUser,
  checkUserName,
} from "../controllers/userController";
import { Role } from "../../../../shared/utils/enums";

const userRoute = express.Router();
userRoute.use(express.json());
userRoute.use(json());
//userRoute.use(authenticationToken);

userRoute.get("/", getUsers);
userRoute.route("/:id").get(login).delete(authByRole(Role), remove);

userRoute.patch("/", updateUser);
userRoute.post("/checkUsername", checkUserName);
userRoute.patch("/ActiveUser", ActiveUser);
userRoute.patch("/ReactivateUser", ReactivateUser);
userRoute.post("/ResendActivationLink", ResendActivationLink);
userRoute.post("/ForgotPasswordLink", ForgotPasswordLink);
userRoute.post("/ChangePassword", changePassword);

export default userRoute; // { router as userRoute };
