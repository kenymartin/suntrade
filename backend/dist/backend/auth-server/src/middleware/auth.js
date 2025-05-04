"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authenticationToken;
exports.authenticationToken = authenticationToken;
exports.authByUser = authByUser;
exports.authByRole = authByRole;
exports.setCurrentUser = setCurrentUser;
exports.verifyToken = verifyToken;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_js_1 = __importDefault(require("../../config.js"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var Userservice_js_1 = __importDefault(require("../../../main-server/src/services/Userservice.js"));
//import { Role } from "@shared/utils/enums.js";
var service = new Userservice_js_1.default();
//Middleware
function authenticationToken(req, res, next) {
    debugger;
    console.log('function:', 'authenticationToken');
    debugger;
    try {
        var authHeader = req.headers["authorization"];
        var token = authHeader && authHeader.split(" ")[1];
        if (token == null)
            return res.sendStatus(401);
        jsonwebtoken_1.default.verify(token, config_js_1.default.jwSecrect, function (err, user) {
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
function authByUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, user, isAuthorized, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, service.getById(id)];
                case 1:
                    user = _b.sent();
                    if (!user)
                        return [2 /*return*/, res.status(404).send("data not found")];
                    isAuthorized = bcrypt_1.default.compareSync(req.user.password, (_a = user.password) !== null && _a !== void 0 ? _a : "") &&
                        req.user.name == user.username;
                    if (!isAuthorized)
                        return [2 /*return*/, res.status(401).send("Invalid username or password")];
                    req.body = { username: req.user.name, password: user.password };
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.log(error_1 === null || error_1 === void 0 ? void 0 : error_1.message);
                    res
                        .status(500)
                        .json("An error ocurred while trying to validate credentials..");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var token, decoded, user, isAuthorized, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    debugger;
                    token = req.headers.authorization;
                    if (!token) {
                        return [2 /*return*/, res.status(403).json({ message: "Token not provided" })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    decoded = jsonwebtoken_1.default.verify(token.split(" ")[1], config_js_1.default.jwSecrect);
                    return [4 /*yield*/, service.getByUsername(decoded.name)];
                case 2:
                    user = _b.sent();
                    if (typeof user === 'undefined' || user === null)
                        return [2 /*return*/, res.status(403).json({ message: "Invalid credentials" })];
                    isAuthorized = bcrypt_1.default.compareSync(decoded.password, (_a = user.password) !== null && _a !== void 0 ? _a : "");
                    if (!isAuthorized)
                        return [2 /*return*/, res.status(403).json({ message: "invalid credentials" })];
                    req.body = { username: decoded.name, password: user.password };
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    return [2 /*return*/, res.status(401).json({ message: "Invalid token" })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function authByRole(roles) {
    return function (req, res, next) {
        var isAuthorized = false;
        if (Array.isArray(roles)) {
            isAuthorized = roles.some(function (o) { return !req.user.roleByUser.includes(o); });
        }
        else {
            isAuthorized = req.user.roleByUser.some(function (o) { return o.roleId === roles; });
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
        userId: user === null || user === void 0 ? void 0 : user.id,
        username: user.username,
    };
}
//# sourceMappingURL=auth.js.map