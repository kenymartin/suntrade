'use strict';
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
exports.Contactservice = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var NotificationService_js_1 = require("./NotificationService.js");
var enums_js_1 = require("../../../../shared/utils/enums.js");
var utils_js_1 = require("../../../utils/utils.js");
var prisma_Client_1 = __importDefault(require("../../../prisma/prisma.Client"));
//
// #endregion
// #region Functions
var Contactservice = /** @class */ (function () {
    function Contactservice() {
    }
    Contactservice.prototype.applyFilter = function (options) {
        throw new Error("Method not implemented.");
    };
    Contactservice.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, prisma_Client_1.default.contact.delete({ where: { id: id } })];
                    case 1:
                        _a.result = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        utils_js_1.ResultError.TriedDeleteOne("Contact");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, this.result];
                }
            });
        });
    };
    Contactservice.prototype.create = function (data) {
        try {
            this.result = prisma_Client_1.default.contact.create({ data: data });
            return this.result;
        }
        catch (error) {
            console.log(error);
            throw new Error("An error ocurred while creatig the contact");
        }
    };
    Contactservice.prototype.getById = function (id) {
        try {
            this.result = prisma_Client_1.default.contact.findUnique({
                where: { id: id },
                include: {
                    User: {
                        select: {
                            username: true,
                            RoleByUser: {
                                //select: { roleId: { select: { id: true } } },
                                where: { isActive: true },
                            },
                        },
                    },
                    Address: {
                        select: { street: true, city: true, state: true, country: true },
                        where: { isActive: true },
                    },
                    Phone: {
                        select: { phone: true, phoneTypeId: true },
                        where: { isActive: true },
                    },
                    Company: {
                        select: { companyName: true, website: true },
                        where: { isActive: true },
                    },
                },
            });
            return this.result;
        }
        catch (error) {
            console.log(error);
            throw new Error("An error ocurred while fectching the contact");
        }
    };
    Contactservice.prototype.getAll = function () {
        try {
            this.result = prisma_Client_1.default.contact.findMany({ include: { User: true } });
            return this.result;
        }
        catch (error) {
            console.log(error);
            throw new Error("An error ocurred while fetching the contacts");
        }
    };
    Contactservice.prototype.update = function (data) {
        try {
            this.result = prisma_Client_1.default.contact.findUnique({
                where: { id: data.id },
            });
        }
        catch (error) {
            console.log(error);
            throw new Error("An error ocurred while updating the contact");
        }
        return this.result;
    };
    Contactservice.prototype.register = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var tcontact, contact, roles, isAdditionalInfo, user, hashPassword, _a, error_2, emailOptions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        debugger;
                        tcontact = data.contact;
                        contact = tcontact;
                        roles = [];
                        isAdditionalInfo = typeof contact.id !== "undefined";
                        user = contact.user;
                        hashPassword = bcrypt_1.default.hashSync(user.password, 10);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        if (isAdditionalInfo)
                            return [2 /*return*/, this.addAddionalInfo(contact)];
                        (0, utils_js_1.pushElement)(roles, user.roleByUser);
                        _a = this;
                        return [4 /*yield*/, prisma_Client_1.default.contact.create({
                                data: {
                                    firstname: contact.firstname,
                                    lastname: contact.lastname,
                                    User: {
                                        create: {
                                            email: user.email,
                                            username: user.username,
                                            password: hashPassword,
                                            RoleByUser: {
                                                createMany: { data: roles },
                                            },
                                        },
                                    },
                                },
                            })];
                    case 2:
                        _a.result = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        console.log(error_2);
                        throw new Error("An erro ocurred while trying to create the register");
                    case 4:
                        emailOptions = {
                            to: user.email,
                            from: "", // This will be set by the NotificationService
                            subject: "", // This will be set by the NotificationService
                            html: "", // This will be set by the NotificationService
                            key: this.result.id, // This will be set by the NotificationService/ This will be set by the NotificationService
                        };
                        // const callback = (error: any, info: any) => {
                        //   if (error) {
                        //     console.error("Error sending email:", error);
                        //   } else {
                        //     console.log("Email sent successfully:");
                        //   }
                        // };
                        debugger;
                        console.log("About to send an email");
                        return [4 /*yield*/, NotificationService_js_1.NotificationService.sendNotification(enums_js_1.NotificationType.Registration, emailOptions, function (error, info) {
                                console.log("Email sent successfully-------->");
                                if (error) {
                                    console.error("Error sending email:", error);
                                }
                                else {
                                    console.log("Email sent successfully...:");
                                }
                            })];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, this.result];
                }
            });
        });
    };
    Contactservice.prototype.addAddionalInfo = function (contact) {
        return __awaiter(this, void 0, void 0, function () {
            var phones, addresses, cards, companies, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.result = false;
                        phones = [];
                        addresses = [];
                        cards = [];
                        companies = [];
                        (0, utils_js_1.pushElement)(phones, contact.phone);
                        (0, utils_js_1.pushElement)(addresses, contact.address);
                        (0, utils_js_1.pushElement)(cards, contact.user.cards);
                        (0, utils_js_1.pushElement)(companies, contact.company);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, prisma_Client_1.default.$transaction([
                                prisma_Client_1.default.phone.createMany({ data: phones }),
                                prisma_Client_1.default.address.createMany({ data: addresses }),
                            ])];
                    case 2:
                        _a.sent();
                        this.result = true;
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        this.result = false;
                        console.log(error_3.message);
                        throw new Error("An erro ocurred while trying to add additional information");
                    case 4: return [2 /*return*/, this.result];
                }
            });
        });
    };
    return Contactservice;
}());
exports.Contactservice = Contactservice;
exports.default = Contactservice;
//# sourceMappingURL=Contactservice.js.map