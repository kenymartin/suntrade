"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.createOrder = exports.getOrders = exports.getOrder = void 0;
const orderService_js_1 = __importDefault(require("../services/orderService.js"));
const service = new orderService_js_1.default();
const getOrder = async (req, res) => {
    try {
        const Id = req.params.id;
        const order = await service.getById(Id);
        res.status(200).json(order);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error getting order" });
    }
};
exports.getOrder = getOrder;
const getOrders = async (req, res) => {
    try {
        const orders = await service.getAll();
        res.status(200).json(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error getting orders" });
    }
};
exports.getOrders = getOrders;
const createOrder = async (req, res) => {
    try {
        const { data } = req.body;
        const order = service.create(data);
        res.status(200).json(order);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating order" });
    }
};
exports.createOrder = createOrder;
const deleteOrder = async (req, res) => {
    try {
        const Id = req.params.id;
        const orderId = service.delete(Id);
        res.status(2001).json(orderId);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error deleting order" });
    }
};
exports.deleteOrder = deleteOrder;
exports.default = {
    getOrder: exports.getOrder,
    getOrders: exports.getOrders,
    createOrder: exports.createOrder,
    deleteOrder: exports.deleteOrder
};
//# sourceMappingURL=orderController.js.map