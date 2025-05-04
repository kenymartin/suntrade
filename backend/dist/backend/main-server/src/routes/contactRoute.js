"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var contactController_js_1 = __importDefault(require("../controllers/contactController.js"));
var joi_1 = __importDefault(require("joi"));
var contactRoute = express_1.default.Router();
contactRoute.get("/filter", contactController_js_1.default.getWithFilter);
contactRoute.post("/register", /*validateScheme,*/ contactController_js_1.default.register);
contactRoute.get("/", contactController_js_1.default.getContacts);
contactRoute.get("/:id", contactController_js_1.default.getContact);
contactRoute.patch("/:id", contactController_js_1.default.updateContact);
function validateScheme(req, res, next) {
    debugger;
    var contact = req.body.data.contact;
    var schema = joi_1.default.object({
        contact: {
            firstname: joi_1.default.string().min(3).required(),
            lastname: joi_1.default.string().min(3).required(),
            stateid: joi_1.default.number().min(1).optional(),
            accountTypeId: joi_1.default.number().optional(),
            user: {
                username: joi_1.default.string().min(7).required(),
                password: joi_1.default.string().min(8).required(),
                roles: joi_1.default.array().items({
                    roleId: joi_1.default.number().required(),
                }),
                email: joi_1.default.string()
                    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }) // Updated email validation
                    .required(),
            },
            address: joi_1.default.array().items({
                addressTypeId: joi_1.default.number().optional(),
                state: joi_1.default.string().optional(),
                city: joi_1.default.string().optional(),
                street: joi_1.default.string().optional(),
                zipcode: joi_1.default.string().optional(),
                country: joi_1.default.string().optional(),
            }),
            phone: joi_1.default.array().items({
                phoneTypeId: joi_1.default.number().optional(),
                phone: joi_1.default.string().optional(),
            }),
            company: joi_1.default.array().items({
                companyName: joi_1.default.string().optional(),
                website: joi_1.default.string().uri().optional(),
            }),
        },
    });
    var error = schema.validate({ contact: contact }).error;
    if (error) {
        return res
            .status(400)
            .json({ error: error.details[0].message.replace("/", " ") });
    }
    else {
        next();
    }
}
exports.default = contactRoute;
//# sourceMappingURL=contactRoute.js.map