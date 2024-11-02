"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderController_js_1 = __importDefault(require("../controllers/orderController.js"));
const userPermission_js_1 = require("../permissions/userPermission.js");
const orderService_js_1 = __importDefault(require("../services/orderService.js"));
const auth_js_1 = __importDefault(require("../../../auth-server/src/middleware/auth.js"));
const express_1 = __importDefault(require("express"));
const orderRoute = express_1.default.Router();
const service = new orderService_js_1.default();
orderRoute.get("/", (req, res) => {
    res.send("Order");
});
orderRoute.get("/:id", auth_js_1.default, setOrder, authGetOrder);
orderRoute.post("/create", orderController_js_1.default.createOrder);
orderRoute.get("/delete", orderController_js_1.default.deleteOrder);
const orders = [
    {
        id: 1,
        userId: 1,
        productname: "SolarPanel1",
        price: 200,
        quantity: 2,
    },
    {
        id: 2,
        userId: 2,
        productname: "SolarPanel2",
        price: 150,
        quantity: 3,
    },
];
function setOrder(res, req, next) {
    const orderId = req.params.id;
    req.order = service.getById(orderId);
    if (req.order === null) {
        res.status(404);
        return res.send("Order not found");
    }
    next();
}
function authGetOrder(req, res, next) {
    if (!(0, userPermission_js_1.canViewOrders)(req.user, req.order)) {
        res.status(401);
        return res.send("Not Allowed");
    }
    next();
}
exports.default = orderRoute;
//# sourceMappingURL=orderRoute.js.map