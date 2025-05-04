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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var solarPanelController_js_1 = require("../controllers/solarPanelController.js");
var express_1 = __importStar(require("express"));
var userPermission_js_1 = require("../permissions/userPermission.js");
// import {
//   authByUser as authorizeUser,
// } from "../../AuthServer/auth.js";
var productService_js_1 = require("../services/productService.js");
var service = new productService_js_1.ProductService();
var solarPanelRoute = express_1.default.Router();
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
function authorizeView(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var solarPanels;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.getAll()];
                case 1:
                    solarPanels = _a.sent();
                    req.solarPanels = solarPanels;
                    if (req.solarPanels == null) {
                        res.status(404);
                        return [2 /*return*/, res.send("Page not found")];
                    }
                    else if (!(0, userPermission_js_1.canViewSolarPanel)(req.user, req.solarPanels)) {
                        res.status(403).send("Not Allowed");
                    }
                    else {
                        next();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function authorizeUpdate(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, solarPanel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(req.params.id, 10);
                    return [4 /*yield*/, service.getById(id)];
                case 1:
                    solarPanel = _a.sent();
                    req.solarPanel = solarPanel;
                    if (req.solarPanel == null) {
                        res.status(404);
                        return [2 /*return*/, res.send("Page not found")];
                    }
                    else if (!(0, userPermission_js_1.canEditSolarPanel)(req.user, req.solarPanel)) {
                        res.status(403).send("Not Allowed");
                    }
                    else {
                        next();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function authorizeDeletion(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, solarPanel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(req.params.id, 10);
                    return [4 /*yield*/, service.getById(id)];
                case 1:
                    solarPanel = _a.sent();
                    req.solarPanel = solarPanel;
                    if (req.solarPanel === null) {
                        res.status(404);
                        return [2 /*return*/, res.send("Page not found")];
                    }
                    else if (!(0, userPermission_js_1.canDeleteSolarPanel)(req.user, solarPanel)) {
                        res.status(403).send("Not Allowed");
                    }
                    else {
                        next();
                    }
                    return [2 /*return*/];
            }
        });
    });
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