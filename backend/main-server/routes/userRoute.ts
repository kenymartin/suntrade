import express, { json } from "express";
import {
  updateUser,
  remove,
  getUsers,
  login,
  checkUserName,
} from "../controllers/userController.js";

import { Role } from "../shared/utils/enums.js";
import authenticationToken, {
  authByRole,
} from "../../auth-server/middleware/auth.js";

const userRoute = express.Router();
userRoute.use(express.json());
userRoute.use(json());
//userRoute.use(authenticationToken);

userRoute.get("/", getUsers);
userRoute
  .route("/:id")
  .get(login)
  .patch(updateUser)
  .delete(authByRole(Role.Admin), remove);

userRoute.post("/checkUsername", checkUserName);

export default userRoute; // { router as userRoute };
