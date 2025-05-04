import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config.js";
import bcrypt from "bcrypt";
import UserService  from '../../../main-server/src/services/Userservice.js'
//import UserService from '@main/services/Userservice.js'
import { Role } from "../../../../shared/utils/enums.js";
//import { Role } from "@shared/utils/enums.js";

const service = new UserService();
//Middleware
export default function authenticationToken(req: any, res: any, next: any) {
  debugger
  console.log('function:','authenticationToken')
  debugger;
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
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}
//Middleware

async function authByUser(req: any, res: any, next: any) {
  try {
    const id = req.params.id;
    const user = await service.getById(id);

    if (!user) return res.status(404).send("data not found");

    const isAuthorized =
      bcrypt.compareSync(req.user.password, user.password ?? "") &&
      req.user.name == user.username;

    if (!isAuthorized)
      return res.status(401).send("Invalid username or password");

    req.body = { username: req.user.name, password: user.password };

    next();
  } catch (error: any) {
    console.log(error?.message);
    res
      .status(500)
      .json("An error ocurred while trying to validate credentials..");
  }
  //next();
}
async function verifyToken(req: any, res: any, next: any) {
  debugger;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }
  try {
    const decoded = jwt.verify(
      token.split(" ")[1],
      config.jwSecrect
    ) as JwtPayload;
    const user = await service.getByUsername(decoded.name);
    if (typeof user ==='undefined' || user === null) return res.status(403).json({ message: "Invalid credentials" });

    const isAuthorized = bcrypt.compareSync(
      decoded.password,
      user.password ?? ""
    );

    if (!isAuthorized)
      return res.status(403).json({ message: "invalid credentials" });
    req.body = { username: decoded.name, password: user.password };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
    //return res.sendStatus(400).json({ message: error.message });
  }
}

function authByRole(roles:typeof Role| typeof Role[]) {
  return (req: any, res: any, next: any) => {
    let isAuthorized = false;
    if (Array.isArray(roles)) {
      isAuthorized = roles.some((o) => !req.user.roleByUser.includes(o));
    } else {
      isAuthorized = req.user.roleByUser.some(
        (o: { roleId: any }) => o.roleId === roles
      );
    }
    if (!isAuthorized) {
      res.status(401).send("Not allowed");
    } else {
      next();
    }
  };
}
function setCurrentUser(user: { id: any; username: any }) {
  config.currentUser = {
    userId: user?.id,
    username: user.username,
  };
}

export {
  authenticationToken,
  authByUser,
  authByRole,
  setCurrentUser,
  verifyToken,
};
