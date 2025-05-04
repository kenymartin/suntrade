"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var CustomLimitter = function (max, time, sfr, ssr) {
    return function (next) {
        (0, express_rate_limit_1.default)({
            windowMs: (time !== null && time !== void 0 ? time : 60) * 1000, //1 minute(s)
            max: max !== null && max !== void 0 ? max : 100, //Maximum 100 requests per windowMs
            message: "Rate limit exceeded,try again later",
            skipFailedRequests: sfr !== null && sfr !== void 0 ? sfr : false, //
            skipSuccessfulRequests: ssr !== null && ssr !== void 0 ? ssr : false, //
        });
        next();
    };
};
exports.default = CustomLimitter;
//# sourceMappingURL=requeslimiting.js.map