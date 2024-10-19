"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const client_1 = require("@prisma/client");
const Singleton_js_1 = __importDefault(require("./singleton/Singleton.js"));
/**
 * Class representing the base class
 */
class BaseService extends Singleton_js_1.default {
    /**
     * Prisma client
     */
    constructor() {
        super();
        this.prisma = new client_1.PrismaClient();
    }
    /**
     * Prisma client
     */
    get prismaClient2() {
        return this.prisma;
    }
}
exports.BaseService = BaseService;
exports.default = BaseService;
//# sourceMappingURL=BaseService.js.map