("use strict");
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import config from "../config";
import {createClient} from "redis";

const authApp = express();
authApp.use(cors());

const redisClient = createClient();
(async () => {
  await redisClient.connect();
})();

authApp.use(express.json());
authApp.use(cors());
// Middleware
//let refreshTokens = []; //This is just for testing in dev.This array might be emptied out whenven the server start.
//The refresh token logic should be move out to the database
//In this case it would be recommendable to use in memory database called Redis
let refreshTokens: any[] = [];
redisClient
  .lRange("refreshTokens", 0, -1)
  .then((token:any) => {
    refreshTokens.push(token);
  })
  .catch((err) => {
    console.log({ error: err });
  });

authApp.post("/login",  (req, res) => {
  debugger
  try {
    const { username, password } = req.body;
    const user = { name: username, password: password };
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, config.refreshTokenSecret()??"");
    redisClient.lPush("refreshTokens", refreshToken);
    //refreshTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    console.error({ error: error });
  }
});

authApp.post("/token", (req, res) => {
  try {
    const refreshtoken = req.body.token;
    if (refreshtoken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshtoken)) return res.sendStatus(403);
    jwt.verify(
      refreshtoken,
      config.refreshTokenSecret()??config.refreshTokenSecret,
      (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
      }
    );
  } catch (error) {
    console.error({ error: error });
  }
});
authApp.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

function generateAccessToken(user: any) {
  return jwt.sign(user, config?.jwSecrect, { expiresIn: config.jwExpiredIn });
}

/*const mainServer = authApp.listen(6000, () => {
  console.log("AuthServer server is running on port 6000");
});*/
//const PORT = process.env.DEV_AUTH_PORT || 6000;
authApp.listen(3001, () => {
  console.log(`Server listening on port ${3001}`);
});