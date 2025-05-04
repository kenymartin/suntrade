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
exports.UserService = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var utils_1 = require("../../../../backend/utils/utils");
var moment_1 = __importDefault(require("moment"));
var utils_2 = require("../../../../shared/utils/utils");
var enums_1 = require("../../../../shared/utils/enums");
var NotificationService_1 = require("./NotificationService");
var prisma_Client_1 = __importDefault(require("../../../prisma/prisma.Client"));
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.applyFilter = function (options) {
        throw new Error("Method not implemented.");
    };
    UserService.prototype.delete = function (id) {
        try {
            this.result = prisma_Client_1.default.user.update({
                where: { id: id },
                select: { id: true },
                data: { isDeleted: true, isActive: false },
            });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.Nofity({ methodName: this.delete.name });
            utils_1.ResultError.TriedDeleteOne("User");
        }
        return this.result;
    };
    UserService.prototype.getById = function (id) {
        debugger;
        try {
            this.result = prisma_Client_1.default.user.findUnique({
                where: { id: id, isActive: true },
                select: {
                    username: true,
                    password: true,
                    id: true,
                    RoleByUser: { select: { roleId: true } },
                    Contact: {
                        select: {
                            firstname: true,
                            lastname: true,
                            middlename: true,
                            dob: true,
                            stateId: true,
                            Email: true,
                            Phone: true,
                            Address: true,
                        },
                    },
                },
            });
        }
        catch (error) { }
        return this.result;
    };
    UserService.prototype.getAll = function () {
        try {
            this.result = prisma_Client_1.default.user.findMany({
                where: { isActive: true },
                select: {
                    username: true,
                    id: true,
                    RoleByUser: true,
                    Contact: {
                        select: {
                            firstname: true,
                            lastname: true,
                            Address: {
                                select: { street: true, city: true, zipcode: true },
                                where: { isActive: true },
                            },
                            Phone: { select: { phone: true }, where: { isActive: true } },
                            Company: { select: { companyName: true, website: true } },
                        },
                    },
                },
            });
        }
        catch (error) { }
        return this.result;
    };
    UserService.prototype.update = function (data) {
        try {
            this.result = prisma_Client_1.default.user.update({ where: { id: data.id }, data: data });
        }
        catch (error) {
            console.log(error);
        }
        return this.result;
    };
    UserService.prototype.ActiveUser = function (id_1) {
        return __awaiter(this, arguments, void 0, function (id, isReactivation) {
            var now, twentyFourHoursAgo, user, isWithinActivationWindow, isExpired, updatedUser, error_1;
            if (isReactivation === void 0) { isReactivation = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        now = (0, moment_1.default)().toDate();
                        twentyFourHoursAgo = (0, moment_1.default)().subtract(24, "hours").toDate();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, prisma_Client_1.default.user.findUnique({
                                where: { contactId: id },
                            })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, new utils_2.ProjectError("User not found.")];
                        }
                        if (user.isActive) {
                            return [2 /*return*/, new utils_2.ProjectError("User is already active.")];
                        }
                        isWithinActivationWindow = (0, moment_1.default)(user.createdAt).isBetween(twentyFourHoursAgo, now);
                        isExpired = !isWithinActivationWindow;
                        if (!(!isExpired || (isExpired && isReactivation))) return [3 /*break*/, 4];
                        return [4 /*yield*/, prisma_Client_1.default.user.update({
                                where: { contactId: id },
                                data: { isActive: true, updatedAt: now },
                            })];
                    case 3:
                        updatedUser = _a.sent();
                        return [2 /*return*/, updatedUser];
                    case 4: return [2 /*return*/, new utils_2.ProjectError("Activation link has expired.The acount cannot be activated after 24 hours", {
                            data: enums_1.AccountActivationError.EL,
                        })];
                    case 5:
                        error_1 = _a.sent();
                        return [2 /*return*/, new utils_2.ProjectError(error_1.message)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.ReactivateUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var now, user, updateUser, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        now = (0, moment_1.default)().toDate();
                        return [4 /*yield*/, prisma_Client_1.default.user.findUnique({
                                where: { contactId: id },
                            })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, new utils_2.ProjectError("User not found.")];
                        }
                        if (user.isActive) {
                            return [2 /*return*/, new utils_2.ProjectError("User is already active.")];
                        }
                        return [4 /*yield*/, prisma_Client_1.default.user.update({
                                where: {
                                    contactId: id,
                                },
                                data: {
                                    isActive: true,
                                    updatedAt: now,
                                },
                            })];
                    case 3:
                        updateUser = _a.sent();
                        return [2 /*return*/, updateUser];
                    case 4:
                        error_2 = _a.sent();
                        return [2 /*return*/, new utils_2.ProjectError(error_2.message)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.ForgotPasswordLink = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        result = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.ResendLink(email, enums_1.NotificationType.ChangePassword)];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, new utils_2.ProjectError("Could not reset password link")];
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    UserService.prototype.ResendLink = function (key, notificationtype) {
        return __awaiter(this, void 0, void 0, function () {
            var user, emailOptions_1, callback_1, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(typeof key === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, prisma_Client_1.default.user.findUnique({
                                where: { email: key },
                                select: { contactId: true, email: true },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, new utils_2.ProjectError("User not found.")];
                        }
                        _a.label = 2;
                    case 2:
                        if (!(typeof key === "number")) return [3 /*break*/, 4];
                        return [4 /*yield*/, prisma_Client_1.default.user.findUnique({
                                where: { contactId: key },
                                select: { contactId: true, email: true },
                            })];
                    case 3:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, new utils_2.ProjectError("User not found.")];
                        }
                        _a.label = 4;
                    case 4:
                        emailOptions_1 = {
                            to: user === null || user === void 0 ? void 0 : user.email,
                            from: "", // This will be set by the NotificationService
                            subject: "", // This will be set by the NotificationService
                            html: "", // This will be set by the NotificationService
                            key: user === null || user === void 0 ? void 0 : user.contactId, // This will be set by the NotificationService/ This will be set by the NotificationService
                            app: { page: 'forgot-password' }
                        };
                        callback_1 = function (error, info) {
                            if (error) {
                                console.error("Error sending email:", error);
                            }
                            else {
                                console.log("Email sent successfully:");
                            }
                        };
                        return [2 /*return*/, new Promise(function (resolve) {
                                resolve(NotificationService_1.NotificationService.sendNotification(notificationtype, emailOptions_1, callback_1));
                            })];
                    case 5:
                        error_4 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_4);
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.ResendActivationLink = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, emailOptions_2, callback_2, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, prisma_Client_1.default.user.findUnique({
                                where: { contactId: id },
                                select: { email: true, contactId: true },
                            })];
                    case 2:
                        user = _a.sent();
                        emailOptions_2 = {
                            to: user === null || user === void 0 ? void 0 : user.email,
                            from: "", // This will be set by the NotificationService
                            subject: "", // This will be set by the NotificationService
                            html: "", // This will be set by the NotificationService
                            key: user === null || user === void 0 ? void 0 : user.contactId, // This will be set by the NotificationService/ This will be set by the NotificationService
                        };
                        callback_2 = function (error, info) {
                            if (error) {
                                console.error("Error sending email:", error);
                            }
                            else {
                                console.log("Email sent successfully:");
                            }
                        };
                        return [2 /*return*/, new Promise(function (resolve) {
                                resolve(NotificationService_1.NotificationService.sendNotification(enums_1.NotificationType.Reactivation, emailOptions_2, callback_2));
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, new Promise(function (_, reject) {
                                reject(error_5);
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.ChangePassword = function (id, password) {
        return __awaiter(this, void 0, void 0, function () {
            var result, hashPassword, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugger;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        hashPassword = bcrypt_1.default.hashSync(password, 10);
                        return [4 /*yield*/, prisma_Client_1.default.user.update({ where: { contactId: id, isActive: true }, data: { password: hashPassword } })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_6);
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // applyFilter(
    //   options: any
    // ): Promise<
    //   (GetResult<
    //     {
    //       id: number;
    //       contactId: number;
    //       username: string;
    //       email: string;
    //       password: string;
    //       isActive: boolean;
    //       createdAt: Date;
    //       createdBy: number;
    //       updatedAt: Date;
    //       updatedBy: number;
    //       isDeleted: boolean;
    //       scalars: any;
    //       objects: any;
    //       composites: any;
    //     },
    //     any
    //   > & {})[]
    // > {
    //   try {
    //     const { selec, where, orderBy, take, skip } = options;
    //     return null;
    //   } catch (error) {}
    // }
    UserService.prototype.getByUsername = function (username, password) {
        debugger;
        try {
            this.result = prisma_Client_1.default.user.findUnique({
                where: { username: username, password: password, isActive: true },
                select: {
                    username: true,
                    password: true,
                    id: true,
                    Contact: {
                        select: {
                            firstname: true,
                            lastname: true,
                            Address: {
                                select: {
                                    street: true,
                                    city: true,
                                    state: true,
                                    zipcode: true,
                                },
                                where: { isActive: true },
                            },
                            Phone: {
                                select: { phone: true, phoneTypeId: true },
                                where: { isActive: true },
                            },
                        },
                    },
                },
            });
        }
        catch (error) {
            console.log(error);
        }
        return this.result;
    };
    UserService.prototype.getByEmail = function (email) {
        try {
            this.result = prisma_Client_1.default.user.findUnique({
                where: { email: email },
                select: {
                    username: true,
                    password: true,
                    Contact: {
                        select: {
                            firstname: true,
                            lastname: true,
                            Address: {
                                select: {
                                    street: true,
                                    city: true,
                                    state: true,
                                    zipcode: true,
                                },
                                where: { isActive: true },
                            },
                            Phone: {
                                select: { phone: true, phoneTypeId: true },
                                where: { isActive: true },
                            },
                        },
                    },
                    //roleByUser: { select: { roleId: true }, where: { isActive: true } },
                },
            });
        }
        catch (error) { }
        return this.result;
    };
    UserService.prototype.checkUserName = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.result = null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, prisma_Client_1.default.user.findUnique({
                                where: { username: username },
                            })];
                    case 2:
                        _a.result = _b.sent();
                        return [2 /*return*/, { isTaken: !!this.result }];
                    case 3:
                        error_7 = _b.sent();
                        console.error("Error checking username", error_7);
                        throw error_7;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
exports.default = UserService;
//# sourceMappingURL=Userservice.js.map