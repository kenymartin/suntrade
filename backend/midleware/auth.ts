import jwt from "jsonwebtoken";
import config from "../config.js";
import UserService from "../services/Userservice.js";
import bcrypt from "bcrypt";
import { Role } from "../shared/utils/enums.js";
const service = new UserService();
//Middleware
function authenticationToken(req: any, res: any, next: any) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, config.jwSecrect, (err: any, user: any) => {
      if (err) {
        return res.status(401).json({ error: err.message });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
async function authByUser(req: any, res: any, next: any) {
  try {
    const user = await service.getByUsername(req.user.name);
    if (user && (await bcrypt.compare(req.user.password, user.password))) {
      delete user.password, req.user.password;
      req.user = user;
      setCurrentUser(req.user);
      next();
    } else {
      res
        .status(401)
        .json({ done: false, value: { message: "Invalid credentials" } });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json("An error ocurred while trying to validate credentials.");
  }
  //next();
}
function authByRole(roles: Role | Role[]) {
  return (req: any, res: any, next: any) => {
    let isAuthorized = false;
    if (Array.isArray(roles)) {
      isAuthorized = roles.some((o) => !req.user.roleByUser.includes(o));
    } else {
      isAuthorized = req.user.roleByUser.some((o) => o.roleId === roles);
    }
    if (!isAuthorized) {
      res.status(401).send("Not allowed");
    } else {
      next();
    }
  };
}
function setCurrentUser(user) {
  config.currentUser = {
    userId: user.id,
    username: user.username,
  };
}

export { authenticationToken, authByUser, authByRole };
