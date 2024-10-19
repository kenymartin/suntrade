import SolarPanelController, {
  createSolarPanel,
  deleteSolarPanel,
  getSolarPanel,
  getSolarPanels,
  updateSolarPanel,
} from "../controllers/solarPanelController.js";
import express, { NextFunction, Request, json } from "express";
import {
  canCreateSolarPanel,
  canDeleteSolarPanel,
  canEditSolarPanel,
  canView,
  canViewComponents,
  canViewSolarPanel,
} from "../permissions/userPermission.js";
// import {
//   authByUser as authorizeUser,
  
// } from "../../AuthServer/auth.js";
import { ProductService } from "../services/productService.js";

const service = new ProductService();
const solarPanelRoute = express.Router();
solarPanelRoute.use(json());
//solarPanelRoute.use(authenticationToken);
solarPanelRoute.post(
  "/create",
  //authorizeUser,
  authorizeCreation,
  createSolarPanel
);

function authorizeCreation(req:any, res:any, next:any) {
  if (!canCreateSolarPanel(req.user)) {
    res.status(401).send("Not Allowed");
  } else {
    next();
  }
}
solarPanelRoute.get("/", /*authorizeUser,*/ authorizeView, getSolarPanels);

async function authorizeView(req:any, res:any, next:any) {
  const solarPanels = await service.getAll();
  req.solarPanels = solarPanels;
  if (req.solarPanels == null) {
    res.status(404);
    return res.send("Page not found");
  } else if (!canViewSolarPanel(req.user, req.solarPanels)) {
    res.status(403).send("Not Allowed");
  } else {
    next();
  }
}
async function authorizeUpdate(req:any, res:any, next:any) {
  const id = parseInt(req.params.id, 10);
  const solarPanel = await service.getById(id);
  req.solarPanel = solarPanel;
  if (req.solarPanel == null) {
    res.status(404);
    return res.send("Page not found");
  } else if (!canEditSolarPanel(req.user, req.solarPanel)) {
    res.status(403).send("Not Allowed");
  } else {
    next();
  }
}
async function authorizeDeletion(req:any, res:any, next:any) {
  const id = parseInt(req.params.id, 10);
  const solarPanel = await service.getById(id);
  req.solarPanel = solarPanel;
  if (req.solarPanel === null) {
    res.status(404);
    return res.send("Page not found");
  } else if (!canDeleteSolarPanel(req.user, solarPanel)) {
    res.status(403).send("Not Allowed");
  } else {
    next();
  }
}

solarPanelRoute
  .route("/:id")
  //.all(authorizeUser)
  .patch(authorizeUpdate, updateSolarPanel)
  .get(authorizeView, getSolarPanel)
  .delete(authorizeDeletion, deleteSolarPanel);

//solarPanelRoute.get("/:id", getSolarPanel);

//solarPanelRoute.patch("/:id", updateSolarPanel);

//solarPanelRoute.delete("/:id", deleteSolarPanel);

export default solarPanelRoute;
