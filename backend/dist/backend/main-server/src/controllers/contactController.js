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
exports.getWithFilter = exports.updateContact = exports.register = exports.getContacts = exports.getContact = void 0;
var Contactservice_js_1 = __importDefault(require("../services/Contactservice.js"));
// import Contact  from "@shared/model/contact.model.js";
//import Joi from "joi";
var service = new Contactservice_js_1.default();
var getContact = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, Id, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                Id = parseInt(id);
                return [4 /*yield*/, service.getById(Id)];
            case 1:
                result = _a.sent();
                if (!result) {
                    res.status(404).json({ error: "Data not found" });
                    return [2 /*return*/];
                }
                res.status(201).json(result);
                console.log(result);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Error fetching the contact", error_1);
                res.status(500).json("An error ocurred while fetching the contact.");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getContact = getContact;
var getContacts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, service.getAll()];
            case 1:
                result = _a.sent();
                if (!result) {
                    res.status(404).json({ error: "Data not found" });
                    return [2 /*return*/];
                }
                res.status(201).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Error fecthing the contacs", error_2);
                res.status(500).json("An error ocurred while fetching the contacts");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getContacts = getContacts;
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resultMessage, test1, test2, test3, data, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                debugger;
                resultMessage = {};
                test1 = 10;
                test2 = 2;
                test3 = test1 + test2;
                console.log(test3);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                data = req.body.query.data;
                return [4 /*yield*/, service.register(data)];
            case 2:
                result = _a.sent();
                if (result) {
                    res.status(201).json({ Done: true, message: "Contact registration succesfully" });
                }
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error("Error creating the register.", error_3);
                res.status(500).json(resultMessage);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var updateContact = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = req.body.data;
                data.id = parseInt(req.params["id"]);
                return [4 /*yield*/, service.update(data)];
            case 1:
                result = _a.sent();
                res.status(201).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error("Error while updating the contact", error_4);
                res.status(500).json("An error ocurred while updating the contact");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateContact = updateContact;
var getWithFilter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, select, where, orderBy, filterOptions, contacts, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, select = _a.select, where = _a.where, orderBy = _a.orderBy;
                filterOptions = {
                    select: select ? select.toString().split(",") : undefined,
                    where: where ? JSON.parse(where.toString()) : undefined,
                    orderBy: orderBy ? JSON.parse(orderBy.toString()) : undefined,
                };
                return [4 /*yield*/, service.applyFilter(filterOptions)];
            case 1:
                contacts = _b.sent();
                res.json(contacts);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                console.error("Error while getting the contacts", error_5);
                res.status(500).json({ message: "Failed to get contacts" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getWithFilter = getWithFilter;
exports.default = {
    getContact: exports.getContact,
    getContacts: exports.getContacts,
    register: exports.register,
    updateContact: exports.updateContact,
    getWithFilter: exports.getWithFilter,
};
//# sourceMappingURL=contactController.js.map