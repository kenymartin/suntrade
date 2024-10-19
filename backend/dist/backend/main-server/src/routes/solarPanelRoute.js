"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const solarPanelController_js_1 = require("../controllers/solarPanelController.js");
const express_1 = __importStar(require("express"));
const userPermission_js_1 = require("../permissions/userPermission.js");
// import {
//   authByUser as authorizeUser,
// } from "../../AuthServer/auth.js";
const productService_js_1 = require("../services/productService.js");
const service = new productService_js_1.ProductService();
const solarPanelRoute = express_1.default.Router();
solarPanelRoute.use((0, express_1.json)());
//solarPanelRoute.use(authenticationToken);
solarPanelRoute.post("/create", 
//authorizeUser,
authorizeCreation, solarPanelController_js_1.createSolarPanel);
function authorizeCreation(req, res, next) {
    if (!(0, userPermission_js_1.canCreateSolarPanel)(req.user)) {
        res.status(401).send("Not Allowed");
    }
    else {
        next();
    }
}
solarPanelRoute.get("/", /*authorizeUser,*/ authorizeView, solarPanelController_js_1.getSolarPanels);
async function authorizeView(req, res, next) {
    const solarPanels = await service.getAll();
    req.solarPanels = solarPanels;
    if (req.solarPanels == null) {
        res.status(404);
        return res.send("Page not found");
    }
    else if (!(0, userPermission_js_1.canViewSolarPanel)(req.user, req.solarPanels)) {
        res.status(403).send("Not Allowed");
    }
    else {
        next();
    }
}
async function authorizeUpdate(req, res, next) {
    const id = parseInt(req.params.id, 10);
    const solarPanel = await service.getById(id);
    req.solarPanel = solarPanel;
    if (req.solarPanel == null) {
        res.status(404);
        return res.send("Page not found");
    }
    else if (!(0, userPermission_js_1.canEditSolarPanel)(req.user, req.solarPanel)) {
        res.status(403).send("Not Allowed");
    }
    else {
        next();
    }
}
async function authorizeDeletion(req, res, next) {
    const id = parseInt(req.params.id, 10);
    const solarPanel = await service.getById(id);
    req.solarPanel = solarPanel;
    if (req.solarPanel === null) {
        res.status(404);
        return res.send("Page not found");
    }
    else if (!(0, userPermission_js_1.canDeleteSolarPanel)(req.user, solarPanel)) {
        res.status(403).send("Not Allowed");
    }
    else {
        next();
    }
}
solarPanelRoute
    .route("/:id")
    //.all(authorizeUser)
    .patch(authorizeUpdate, solarPanelController_js_1.updateSolarPanel)
    .get(authorizeView, solarPanelController_js_1.getSolarPanel)
    .delete(authorizeDeletion, solarPanelController_js_1.deleteSolarPanel);
//solarPanelRoute.get("/:id", getSolarPanel);
//solarPanelRoute.patch("/:id", updateSolarPanel);
//solarPanelRoute.delete("/:id", deleteSolarPanel);
exports.default = solarPanelRoute;
//# sourceMappingURL=solarPanelRoute.js.map