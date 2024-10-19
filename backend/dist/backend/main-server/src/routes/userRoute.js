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
const express_1 = __importStar(require("express"));
const auth_1 = require("../../../../backend/auth-server/src/middleware/auth");
const userController_1 = require("../controllers/userController");
const userController_2 = require("../controllers/userController");
const enums_1 = require("../../../../shared/utils/enums");
const userRoute = express_1.default.Router();
userRoute.use(express_1.default.json());
userRoute.use((0, express_1.json)());
//userRoute.use(authenticationToken);
userRoute.get("/", userController_2.getUsers);
userRoute.route("/:id").get(userController_2.login).delete((0, auth_1.authByRole)(enums_1.Role), userController_1.remove);
userRoute.patch("/", userController_2.updateUser);
userRoute.post("/checkUsername", userController_2.checkUserName);
userRoute.patch("/ActiveUser", userController_1.ActiveUser);
userRoute.patch("/ReactivateUser", userController_1.ReactivateUser);
userRoute.post("/ResendActivationLink", userController_1.ResendActivationLink);
userRoute.post("/ForgotPasswordLink", userController_1.ForgotPasswordLink);
userRoute.post("/ChangePassword", userController_1.changePassword);
exports.default = userRoute; // { router as userRoute };
//# sourceMappingURL=userRoute.js.map