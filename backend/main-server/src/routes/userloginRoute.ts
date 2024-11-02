import express, { json } from "express";
import {verifyToken} from "../../../auth-server/src/middleware/auth.js";
import { login } from "../controllers/userController.js";

const userLoginRoute = express.Router();
userLoginRoute.use(express.json());
userLoginRoute.use(json());

userLoginRoute.get("/", verifyToken, login);

export default userLoginRoute;
