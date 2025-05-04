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
exports.changePassword = exports.checkUserName = exports.remove = exports.login = exports.getUsers = exports.getUser = exports.ForgotPasswordLink = exports.ResendActivationLink = exports.ActiveUser = exports.ReactivateUser = exports.updateUser = void 0;
var Userservice_1 = __importDefault(require("../services/Userservice"));
// #endregion
// #region functions
var service = new Userservice_1.default();
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                debugger;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                data = req.body.data;
                data.id = req.params["id"];
                return [4 /*yield*/, service.update(data)];
            case 2:
                user = _a.sent();
                res.status(201).json(user);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log("Error updating user", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var ReactivateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, Id, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                debugger;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id = req.body.id;
                Id = parseInt(id);
                return [4 /*yield*/, service.ReactivateUser(Id)];
            case 2:
                result = _a.sent();
                if (result instanceof Error) {
                    res.status(404).json({
                        message: result.message,
                    });
                }
                else {
                    res.status(201).json({
                        message: "User Rectivated Successfully",
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(500).json({ message: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.ReactivateUser = ReactivateUser;
var ActiveUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, isReactivation, Id, reactivation, result, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                debugger;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                _a = req.body, id = _a.id, isReactivation = _a.isReactivation;
                Id = parseInt(id);
                reactivation = Boolean(isReactivation);
                return [4 /*yield*/, service.ActiveUser(Id, reactivation)];
            case 2:
                result = _b.sent();
                if (result instanceof Error) {
                    res.status(400).json({
                        message: result.message,
                    });
                }
                else {
                    res.status(200).json({
                        message: "User account activated successfully!",
                        user: result,
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                console.error("Error in activateUserController:", error_3);
                res.status(500).json({
                    message: "Internal server error. Please try again later.",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.ActiveUser = ActiveUser;
var ResendActivationLink = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, Id, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                debugger;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                id = req.body.id;
                Id = parseInt(id);
                return [4 /*yield*/, service.ResendActivationLink(Id)];
            case 2:
                result = _a.sent();
                if (result) {
                    res.status(200).json({
                        message: "Activation link was already sent!",
                    });
                }
                else {
                    res.status(400).json({
                        message: "There was an error sending the activation link. Please try again later.",
                        user: result,
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error("Error in ResendActivationLink:", error_4);
                res.status(500).json({
                    message: "Internal server error. Please try again later.",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.ResendActivationLink = ResendActivationLink;
var ForgotPasswordLink = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, result, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                debugger;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                email = req.body.email;
                return [4 /*yield*/, service.ForgotPasswordLink(email)];
            case 2:
                result = _a.sent();
                if (result) {
                    res.status(200).json({
                        message: "Password reset link was sent successfully!",
                        user: result,
                    });
                }
                else {
                    res.status(400).json({
                        message: "There was an error sending the password reset link. Please try again later.",
                        user: result,
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.error("Error in ResetPasswordLink:", error_5);
                res.status(500).json({
                    message: "Internal server error. Please try again later.",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.ForgotPasswordLink = ForgotPasswordLink;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                debugger;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                userId = req.params.id;
                return [4 /*yield*/, service.getById(userId)];
            case 2:
                user = _a.sent();
                res.status(200).json(user);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error("Error fetching user:", error_6);
                res
                    .status(500)
                    .json({ error: "An error occurred while fetching the user..." });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var getUsers = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, service.getAll()];
            case 1:
                users = _a.sent();
                res.status(200).json(users);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.error("Error fetching users:", error_7);
                res
                    .status(500)
                    .json({ error: "An error occurred while fetching the users." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, error_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                debugger;
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, service.getByUsername(username, password)];
            case 2:
                user = _b.sent();
                user.password = null;
                res.status(200).json(user);
                return [3 /*break*/, 4];
            case 3:
                error_8 = _b.sent();
                console.error("Error fetching users:", error_8);
                res
                    .status(500)
                    .json({ error: "An error occurred while fetching the users..." });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userId, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, service.delete(id)];
            case 1:
                userId = _a.sent();
                userId !== undefined
                    ? res
                        .status(201)
                        .json({
                        done: true,
                        value: { userId: userId, message: "succesfuly deleted" },
                    })
                    : res
                        .status(501)
                        .json({ done: false, value: { message: "failed to delete" } });
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                console.log("Error deleting user", error_9);
                res
                    .status(500)
                    .json({ error: "An Error ocurred while trying to delete the user" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.remove = remove;
var checkUserName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, data, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                username = req.body.username;
                return [4 /*yield*/, service.checkUserName(username)];
            case 1:
                data = _a.sent();
                res.status(200).json({ data: data });
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                console.log("Error checking username", error_10);
                res
                    .status(500)
                    .json({ error: "An error occurred while checking the username..." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.checkUserName = checkUserName;
var changePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, password, result, error_11;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                debugger;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                _a = req.body, id = _a.id, password = _a.password;
                return [4 /*yield*/, service.ChangePassword(id, password)];
            case 2:
                result = _b.sent();
                if (result instanceof Error) {
                    res.status(400).json({
                        message: result.message,
                    });
                }
                else {
                    res.status(200).json({
                        message: "password updated successfully!",
                        user: result,
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                error_11 = _b.sent();
                console.log("Error changing password", error_11);
                res
                    .status(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.changePassword = changePassword;
exports.default = {
    getUsers: exports.getUsers,
    getUser: exports.getUser,
    updateUser: exports.updateUser,
    login: exports.login,
    checkUserName: exports.checkUserName,
    ActiveUser: exports.ActiveUser,
    ReactivateUser: exports.ReactivateUser,
    ResendActivationLink: exports.ResendActivationLink,
    ForgotPasswordLink: exports.ForgotPasswordLink,
};
// #endregion
//# sourceMappingURL=userController.js.map