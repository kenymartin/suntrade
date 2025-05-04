import express, { json } from "express";
import { getPhones } from "../controllers/phoneControlller.js";
const phoneRoute = express.Router();

phoneRoute.use(express.json());
phoneRoute.use(json());

phoneRoute.get("/", getPhones);

export default phoneRoute;
