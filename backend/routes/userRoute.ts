import express, { json } from "express";
import { updateUser, getUser,remove, getUsers } from "../controllers/userController.js";
import {authenticationToken,authByRole,authByUser } from "../midleware/auth.js";
import { Role } from "../shared/utils/enums.js";

const userRoute = express.Router();
userRoute.use(express.json());
userRoute.use(json());
userRoute.use(authenticationToken)

userRoute.get("/",authByUser,authByRole([Role.Admin,Role.SuperAdmin]),getUsers);
userRoute.route('/:id').all(authByUser)
.get(getUser)
.patch(updateUser)
.delete(authByRole(Role.Admin),remove)

export default userRoute; // { router as userRoute };
