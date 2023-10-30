import SolarPanelController, {
  createSolarPanel,
  deleteSolarPanel,
  getSolarPanel,
  getSolarPanels,
  updateSolarPanel,
} from "../controllers/solarPanelController.js";
import express, { json } from "express";
import {
  canCreateSolarPanel,
  canDeleteSolarPanel,
  canEditSolarPanel,
  canView,
  canViewComponents,
  canViewSolarPanel,
} from "../permissions/userPermission.js";
import {
  authByUser as authorizeUser,
  authenticationToken,
} from "../midleware/auth.js";
import { SolarPanelService } from "../services/solarPanelService.js";
import { Role } from "../shared/utils/enums.js";
const service = new SolarPanelService();
const solarPanelRoute = express.Router();
solarPanelRoute.use(json());
solarPanelRoute.use(authenticationToken);
solarPanelRoute.post(
  "/create",
  authorizeUser,
  authorizeCreation,
  createSolarPanel
);

function authorizeCreation(req, res, next) {
  if (!canCreateSolarPanel(req.user)) {
    res.status(401).send("Not Allowed");
  } else {
    next();
  }
}
solarPanelRoute.get("/", authorizeUser, authorizeView, getSolarPanels);

async function authorizeView(req, res, next) {
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
async function authorizeUpdate(req, res, next) {
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
async function authorizeDeletion(req, res, next) {
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
  .all(authorizeUser)
  .patch(authorizeUpdate, updateSolarPanel)
  .get(authorizeView,getSolarPanel)
  .delete(authorizeDeletion,deleteSolarPanel);

//solarPanelRoute.get("/:id", getSolarPanel);

//solarPanelRoute.patch("/:id", updateSolarPanel);

//solarPanelRoute.delete("/:id", deleteSolarPanel);

export default solarPanelRoute;
