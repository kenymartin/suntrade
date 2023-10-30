import express, { json } from "express";
const phoneRoute = express.Router();

phoneRoute.use(express.json());
phoneRoute.use(json());

phoneRoute.get("/", async (_req, res) => {
 
});

export default phoneRoute;
