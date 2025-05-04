"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var userRoute_js_1 = __importDefault(require("./routes/userRoute.js"));
var cors_1 = __importDefault(require("cors"));
var userloginRoute_js_1 = __importDefault(require("./routes/userloginRoute.js"));
var orderRoute_js_1 = __importDefault(require("./routes/orderRoute.js"));
var phoneRoute_js_1 = __importDefault(require("./routes/phoneRoute.js"));
var contactRoute_js_1 = __importDefault(require("./routes/contactRoute.js"));
var solarPanelRoute_js_1 = __importDefault(require("./routes/solarPanelRoute.js"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*', // Allow all origins (for development)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
var corsOptions = {
    origin: "http://localhost:5173",
    // origin: "http://localhost:3004",
    credentials: true, //access-control-allow-credentials:true
    //optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
var limitter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, //1 minute(s)
    max: 100, //Maximum 100 requests per windowMs
    message: "Rate limit exceeded,try again later",
    skipFailedRequests: true,
    skipSuccessfulRequests: true,
});
app.use(limitter);
app.use(express_1.default.json());
// Routes
app.use("/api/users", userRoute_js_1.default);
app.use("/api/userlogin", userloginRoute_js_1.default);
app.use("/api/contacts", contactRoute_js_1.default);
app.use("/api/solarpanels", solarPanelRoute_js_1.default);
app.use("/api/phones", phoneRoute_js_1.default);
app.use("/api/orders", orderRoute_js_1.default);
// import express from 'express';
// const app = express();
// app.get('/', (_req, res) => {
//   res.send('Hello, World!');ççç
// });
app.listen(3000, '0.0.0.0', function () {
    console.log('Server is running on port 3000');
});
//# sourceMappingURL=server.js.map