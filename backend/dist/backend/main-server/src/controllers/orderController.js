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
exports.deleteOrder = exports.createOrder = exports.getOrders = exports.getOrder = void 0;
var orderService_js_1 = __importDefault(require("../services/orderService.js"));
var service = new orderService_js_1.default();
var getOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, order, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                Id = req.params.id;
                return [4 /*yield*/, service.getById(Id)];
            case 1:
                order = _a.sent();
                res.status(200).json(order);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ error: "Error getting order" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrder = getOrder;
var getOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, service.getAll()];
            case 1:
                orders = _a.sent();
                res.status(200).json(orders);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ error: "Error getting orders" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrders = getOrders;
var createOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, order;
    return __generator(this, function (_a) {
        try {
            data = req.body.data;
            order = service.create(data);
            res.status(200).json(order);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error creating order" });
        }
        return [2 /*return*/];
    });
}); };
exports.createOrder = createOrder;
var deleteOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Id, orderId;
    return __generator(this, function (_a) {
        try {
            Id = req.params.id;
            orderId = service.delete(Id);
            res.status(2001).json(orderId);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error deleting order" });
        }
        return [2 /*return*/];
    });
}); };
exports.deleteOrder = deleteOrder;
exports.default = {
    getOrder: exports.getOrder,
    getOrders: exports.getOrders,
    createOrder: exports.createOrder,
    deleteOrder: exports.deleteOrder
};
//# sourceMappingURL=orderController.js.map