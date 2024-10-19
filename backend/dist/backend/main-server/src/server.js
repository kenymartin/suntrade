"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const userRoute_js_1 = __importDefault(require("./routes/userRoute.js"));
const cors_1 = __importDefault(require("cors"));
const userloginRoute_js_1 = __importDefault(require("./routes/userloginRoute.js"));
const orderRoute_js_1 = __importDefault(require("./routes/orderRoute.js"));
const phoneRoute_js_1 = __importDefault(require("./routes/phoneRoute.js"));
const contactRoute_js_1 = __importDefault(require("./routes/contactRoute.js"));
const solarPanelRoute_js_1 = __importDefault(require("./routes/solarPanelRoute.js"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true, //access-control-allow-credentials:true
    //optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
const limitter = (0, express_rate_limit_1.default)({
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
app.listen(3000, () => {
    console.log(`Server listening on port ${3000}`);
});
// import express from 'express';
// const app = express();
// app.get('/', (_req, res) => {
//   res.send('Hello, World!');
// });
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
//# sourceMappingURL=server.js.map