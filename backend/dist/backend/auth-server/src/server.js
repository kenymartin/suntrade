"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
("use strict");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const redis_1 = require("redis");
const authApp = (0, express_1.default)();
authApp.use((0, cors_1.default)());
const redisClient = (0, redis_1.createClient)();
(async () => {
    await redisClient.connect();
})();
authApp.use(express_1.default.json());
authApp.use((0, cors_1.default)());
// Middleware
//let refreshTokens = []; //This is just for testing in dev.This array might be emptied out whenven the server start.
//The refresh token logic should be move out to the database
//In this case it would be recommendable to use in memory database called Redis
let refreshTokens = [];
redisClient
    .lRange("refreshTokens", 0, -1)
    .then((token) => {
    refreshTokens.push(token);
})
    .catch((err) => {
    console.log({ error: err });
});
authApp.post("/login", (req, res) => {
    debugger;
    try {
        const { username, password } = req.body;
        const user = { name: username, password: password };
        const accessToken = generateAccessToken(user);
        const refreshToken = jsonwebtoken_1.default.sign(user, config_1.default.refreshTokenSecret() ?? "");
        redisClient.lPush("refreshTokens", refreshToken);
        //refreshTokens.push(refreshToken);
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
    }
    catch (error) {
        console.error({ error: error });
    }
});
authApp.post("/token", (req, res) => {
    try {
        const refreshtoken = req.body.token;
        if (refreshtoken == null)
            return res.sendStatus(401);
        if (!refreshTokens.includes(refreshtoken))
            return res.sendStatus(403);
        jsonwebtoken_1.default.verify(refreshtoken, config_1.default.refreshTokenSecret() ?? config_1.default.refreshTokenSecret, (err, user) => {
            if (err)
                return res.sendStatus(403);
            const accessToken = generateAccessToken({ name: user.name });
            res.json({ accessToken: accessToken });
        });
    }
    catch (error) {
        console.error({ error: error });
    }
});
authApp.delete("/logout", (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.sendStatus(204);
});
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign(user, config_1.default?.jwSecrect, { expiresIn: config_1.default.jwExpiredIn });
}
/*const mainServer = authApp.listen(6000, () => {
  console.log("AuthServer server is running on port 6000");
});*/
//const PORT = process.env.DEV_AUTH_PORT || 6000;
authApp.listen(3001, () => {
    console.log(`Server listening on port ${3001}`);
});
//# sourceMappingURL=server.js.map