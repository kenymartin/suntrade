"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhones = exports.getPhone = void 0;
const PhoneService_js_1 = __importDefault(require("../services/PhoneService.js"));
const service = new PhoneService_js_1.default();
const getPhone = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const phone = await service.getById(id);
        res.status(200).json(phone);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getPhone = getPhone;
const getPhones = async (req, res) => {
    try {
        const phones = await service.getAll();
        res.status(200).json(phones);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getPhones = getPhones;
exports.default = {
    getPhone: exports.getPhone,
    getPhones: exports.getPhones,
};
//# sourceMappingURL=phoneControlller.js.map