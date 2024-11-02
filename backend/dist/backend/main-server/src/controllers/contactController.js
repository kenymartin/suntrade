"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWithFilter = exports.updateContact = exports.register = exports.getContacts = exports.getContact = void 0;
const Contactservice_js_1 = __importDefault(require("../services/Contactservice.js"));
//import Joi from "joi";
const service = new Contactservice_js_1.default();
const getContact = async (req, res) => {
    try {
        const { id } = req.params;
        const Id = parseInt(id);
        const result = await service.getById(Id);
        if (!result) {
            res.status(404).json({ error: "Data not found" });
            return;
        }
        res.status(201).json(result);
        console.log(result);
    }
    catch (error) {
        console.error("Error fetching the contact", error);
        res.status(500).json("An error ocurred while fetching the contact.");
    }
};
exports.getContact = getContact;
const getContacts = async (req, res) => {
    try {
        const result = await service.getAll();
        if (!result) {
            res.status(404).json({ error: "Data not found" });
            return;
        }
        res.status(201).json(result);
    }
    catch (error) {
        console.error("Error fecthing the contacs", error);
        res.status(500).json("An error ocurred while fetching the contacts");
    }
};
exports.getContacts = getContacts;
const register = async (req, res) => {
    debugger;
    let resultMessage = {};
    try {
        const { data } = req.body;
        const result = await service.register(data);
        if (result)
            res
                .status(201)
                .json({ Done: true, message: "Contact registration succesfully" });
    }
    catch (error) {
        console.error("Error creating the register.", error);
        res.status(500).json(resultMessage);
    }
};
exports.register = register;
const updateContact = async (req, res) => {
    try {
        const { data } = req.body;
        data.id = parseInt(req.params['id']);
        const result = await service.update(data);
        res.status(201).json(result);
    }
    catch (error) {
        console.error('Error while updating the contact', error);
        res.status(500).json("An error ocurred while updating the contact");
    }
};
exports.updateContact = updateContact;
const getWithFilter = async (req, res) => {
    try {
        const { select, where, orderBy } = req.query;
        const filterOptions = {
            select: select ? select.toString().split(",") : undefined,
            where: where ? JSON.parse(where.toString()) : undefined,
            orderBy: orderBy ? JSON.parse(orderBy.toString()) : undefined,
        };
        const contacts = await service.applyFilter(filterOptions);
        res.json(contacts);
    }
    catch (error) {
        console.error("Error while getting the contacts", error);
        res.status(500).json({ message: "Failed to get contacts" });
    }
};
exports.getWithFilter = getWithFilter;
exports.default = {
    getContact: exports.getContact,
    getContacts: exports.getContacts,
    register: exports.register,
    updateContact: exports.updateContact,
    getWithFilter: exports.getWithFilter,
};
//# sourceMappingURL=contactController.js.map