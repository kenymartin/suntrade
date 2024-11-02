"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authenticationToken;
exports.authenticationToken = authenticationToken;
exports.default = authenticationToken;
exports.authenticationToken = authenticationToken;
exports.authByUser = authByUser;
exports.authByRole = authByRole;
exports.setCurrentUser = setCurrentUser;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = __importDefault(require("../../config.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Userservice_js_1 = __importDefault(require("../../../main-server/src/services/Userservice.js"));
const service = new Userservice_js_1.default();
//Middleware
function authenticationToken(req, res, next) {
    console.log('function:', 'authenticationToken');
    debugger;
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null)
            return res.sendStatus(401);
        jsonwebtoken_1.default.verify(token, config_js_1.default.jwSecrect, (err, user) => {
            if (err) {
                return res.status(401).json({ error: err.message });
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
}
//Middleware
async function authByUser(req, res, next) {
    try {
        const id = req.params.id;
        const user = await service.getById(id);
        if (!user)
            return res.status(404).send("data not found");
        const isAuthorized = bcrypt_1.default.compareSync(req.user.password, user.password ?? "") &&
            req.user.name == user.username;
        if (!isAuthorized)
            return res.status(401).send("Invalid username or password");
        req.body = { username: req.user.name, password: user.password };
        next();
    }
    catch (error) {
        console.log(error?.message);
        res
            .status(500)
            .json("An error ocurred while trying to validate credentials..");
    }
    //next();
}
async function verifyToken(req, res, next) {
    debugger;
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: "Token not provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token.split(" ")[1], config_js_1.default.jwSecrect);
        const user = await service.getByUsername(decoded.name);
        if (typeof user === 'undefined' || user === null)
            return res.status(403).json({ message: "Invalid credentials" });
        const isAuthorized = bcrypt_1.default.compareSync(decoded.password, user.password ?? "");
        if (!isAuthorized)
            return res.status(403).json({ message: "invalid credentials" });
        req.body = { username: decoded.name, password: user.password };
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
        //return res.sendStatus(400).json({ message: error.message });
    }
}
function authByRole(roles) {
    return (req, res, next) => {
        let isAuthorized = false;
        if (Array.isArray(roles)) {
            isAuthorized = roles.some((o) => !req.user.roleByUser.includes(o));
        }
        else {
            isAuthorized = req.user.roleByUser.some((o) => o.roleId === roles);
        }
        if (!isAuthorized) {
            res.status(401).send("Not allowed");
        }
        else {
            next();
        }
    };
}
function setCurrentUser(user) {
    config_js_1.default.currentUser = {
        userId: user?.id,
        username: user.username,
    };
}
//# sourceMappingURL=auth.js.map