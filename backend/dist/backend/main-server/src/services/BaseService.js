"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
var client_1 = require("@prisma/client");
var Singleton_js_1 = __importDefault(require("./singleton/Singleton.js"));
/**
 * Class representing the base class
 */
var BaseService = /** @class */ (function (_super) {
    __extends(BaseService, _super);
    /**
     * Prisma client
     */
    function BaseService() {
        var _this = _super.call(this) || this;
        _this.prisma = new client_1.PrismaClient();
        return _this;
    }
    Object.defineProperty(BaseService.prototype, "prismaClient2", {
        /**
         * Prisma client
         */
        get: function () {
            return this.prisma;
        },
        enumerable: false,
        configurable: true
    });
    return BaseService;
}(Singleton_js_1.default));
exports.BaseService = BaseService;
exports.default = BaseService;
//# sourceMappingURL=BaseService.js.map