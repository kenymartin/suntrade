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
exports.ProductService = void 0;
var client_1 = require("@prisma/client");
var utils_js_1 = require("../../../utils/utils.js");
var config_js_1 = __importDefault(require("../../../config.js"));
var prisma = new client_1.PrismaClient();
/**
 * A service class that implements the ICrud interface for managing SolarPanel objects.
 */
var ProductService = /** @class */ (function () {
    function ProductService() {
    }
    /**
     * Creates a new solar panel record in the database.
     * @param {any} data - The data object containing the solar panel details.
     * @returns {Promise<Product>} - A promise that resolves to the created solar panel object.
     * @throws {ResultError} - If there is an error creating the solar panel record.
     */
    ProductService.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var solarPanel, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        solarPanel = data.solarPanel;
                        _a = this;
                        return [4 /*yield*/, prisma.product.create({
                                data: {
                                    description: solarPanel.description,
                                    typeId: solarPanel.typeId,
                                    createdBy: config_js_1.default.currentUser.userId,
                                    imageUrl: solarPanel.imageUrl,
                                    //components: { createMany: { data: components } },
                                },
                            })];
                    case 1:
                        _a.result = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        utils_js_1.ResultError.TriedCreateOne("SolarPanel");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, this.result];
                }
            });
        });
    };
    /**
     * Retrieves a solar panel by its ID from the database.
     * @param {number} id - The ID of the solar panel to retrieve.
     * @returns {Promise<Product>} - A promise that resolves to the retrieved solar panel.
     * @throws {ResultError} - If there was an error retrieving the solar panel.
     */
    ProductService.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, prisma.product.findUnique({
                                where: { id: id, isActive: true },
                            })];
                    case 1:
                        _a.result = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        console.log(error_2);
                        utils_js_1.ResultError.TriedGetOne("SolarPanel");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, this.result];
                }
            });
        });
    };
    /**
     * Retrieves all solar panels from the database.
     * @returns {Promise<Product[]>} - A promise that resolves to an array of SolarPanel objects.
     * @throws {ResultError} - If there was an error retrieving the solar panels from the database.
     */
    ProductService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, prisma.product.findMany()];
                    case 1:
                        _a.result = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        console.log(error_3);
                        utils_js_1.ResultError.TriedGetMany("SolarPanel");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, this.result];
                }
            });
        });
    };
    /**
     * Updates a solar panel record in the database with the provided data.
     * @param {Product} data - The updated solar panel data.
     * @returns {Promise<Product>} - A promise that resolves to the updated solar panel record.
     * @throws {ResultError} - If there is an error updating the solar panel record.
     */
    ProductService.prototype.update = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        console.log("===========>", data);
                        _a = this;
                        return [4 /*yield*/, prisma.product.update({
                                where: { id: data.id },
                                data: data,
                            })];
                    case 1:
                        _a.result = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.log(error_4);
                        utils_js_1.ResultError.TriedUpdateOne("SolarPanel");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, this.result];
                }
            });
        });
    };
    /**
     * Deletes a solar panel record from the database based on the provided ID.
     * @param {number} id - The ID of the solar panel record to delete.
     * @returns {Promise<number>} - The number of records deleted (should always be 1).
     * @throws {ResultError} - If there was an error deleting the record.
     */
    ProductService.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.result = prisma.product.delete({ where: { id: id } });
                }
                catch (error) {
                    console.log(error);
                    utils_js_1.ResultError.TriedDeleteOne("SolarPanel");
                }
                return [2 /*return*/, this.result];
            });
        });
    };
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=productService.js.map