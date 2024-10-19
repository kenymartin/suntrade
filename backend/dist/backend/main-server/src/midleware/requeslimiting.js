"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const CustomLimitter = (max, time, sfr, ssr) => {
    return (next) => {
        (0, express_rate_limit_1.default)({
            windowMs: (time ?? 60) * 1000, //1 minute(s)
            max: max ?? 100, //Maximum 100 requests per windowMs
            message: "Rate limit exceeded,try again later",
            skipFailedRequests: sfr ?? false, //
            skipSuccessfulRequests: ssr ?? false, //
        });
        next();
    };
};
exports.default = CustomLimitter;
//# sourceMappingURL=requeslimiting.js.map