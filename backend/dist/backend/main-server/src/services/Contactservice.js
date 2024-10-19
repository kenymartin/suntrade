'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contactservice = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const NotificationService_js_1 = require("./NotificationService.js");
const enums_js_1 = require("../../../../shared/utils/enums.js");
const utils_js_1 = require("../../../utils/utils.js");
const prisma_Client_1 = __importDefault(require("../../../prisma/prisma.Client"));
//
// #endregion
// #region Functions
class Contactservice {
    applyFilter(options) {
        throw new Error("Method not implemented.");
    }
    async delete(id) {
        try {
            this.result = await prisma_Client_1.default.contact.delete({ where: { id: id } });
        }
        catch (error) {
            console.log(error);
            utils_js_1.ResultError.TriedDeleteOne("Contact");
        }
        return this.result;
    }
    create(data) {
        try {
            this.result = prisma_Client_1.default.contact.create({ data });
            return this.result;
        }
        catch (error) {
            console.log(error);
            throw new Error("An error ocurred while creatig the contact");
        }
    }
    getById(id) {
        try {
            this.result = prisma_Client_1.default.contact.findUnique({
                where: { id: id },
                include: {
                    User: {
                        select: {
                            username: true,
                            RoleByUser: {
                                //select: { roleId: { select: { id: true } } },
                                where: { isActive: true },
                            },
                        },
                    },
                    Address: {
                        select: { street: true, city: true, state: true, country: true },
                        where: { isActive: true },
                    },
                    Phone: {
                        select: { phone: true, phoneTypeId: true },
                        where: { isActive: true },
                    },
                    Company: {
                        select: { companyName: true, website: true },
                        where: { isActive: true },
                    },
                },
            });
            return this.result;
        }
        catch (error) {
            console.log(error);
            throw new Error("An error ocurred while fectching the contact");
        }
    }
    getAll() {
        try {
            this.result = prisma_Client_1.default.contact.findMany({ include: { User: true } });
            return this.result;
        }
        catch (error) {
            console.log(error);
            throw new Error("An error ocurred while fetching the contacts");
        }
    }
    update(data) {
        try {
            this.result = prisma_Client_1.default.contact.findUnique({
                where: { id: data.id },
            });
        }
        catch (error) {
            console.log(error);
            throw new Error("An error ocurred while updating the contact");
        }
        return this.result;
    }
    async register(data) {
        debugger;
        const { contact: tcontact } = data;
        const contact = tcontact;
        const roles = [];
        const isAdditionalInfo = typeof contact.id !== "undefined"; //validate if id exists already
        const user = contact.user;
        const hashPassword = bcrypt_1.default.hashSync(user.password, 10);
        try {
            if (isAdditionalInfo)
                return this.addAddionalInfo(contact);
            (0, utils_js_1.pushElement)(roles, user.roleByUser);
            this.result = await prisma_Client_1.default.contact.create({
                data: {
                    firstname: contact.firstname,
                    lastname: contact.lastname,
                    User: {
                        create: {
                            email: user.email,
                            username: user.username,
                            password: hashPassword,
                            RoleByUser: {
                                createMany: { data: roles },
                            },
                        },
                    },
                },
            });
        }
        catch (error) {
            console.log(error);
            throw new Error("An erro ocurred while trying to create the register");
        }
        // Send email notification
        const emailOptions = {
            to: user.email,
            from: "", // This will be set by the NotificationService
            subject: "", // This will be set by the NotificationService
            html: "", // This will be set by the NotificationService
            key: this.result.id, // This will be set by the NotificationService/ This will be set by the NotificationService
        };
        const callback = (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            }
            else {
                console.log("Email sent successfully:");
            }
        };
        await NotificationService_js_1.NotificationService.sendNotification(enums_js_1.NotificationType.Registration, emailOptions, callback);
        return this.result;
    }
    async addAddionalInfo(contact) {
        this.result = false;
        const phones = [];
        const addresses = [];
        const cards = [];
        const companies = [];
        (0, utils_js_1.pushElement)(phones, contact.phone);
        (0, utils_js_1.pushElement)(addresses, contact.address);
        (0, utils_js_1.pushElement)(cards, contact.user.cards);
        (0, utils_js_1.pushElement)(companies, contact.company);
        try {
            await prisma_Client_1.default.$transaction([
                prisma_Client_1.default.phone.createMany({ data: phones }),
                prisma_Client_1.default.address.createMany({ data: addresses }),
            ]);
            this.result = true;
        }
        catch (error) {
            this.result = false;
            console.log(error.message);
            throw new Error("An erro ocurred while trying to add additional information");
        }
        return this.result;
    }
}
exports.Contactservice = Contactservice;
exports.default = Contactservice;
//# sourceMappingURL=Contactservice.js.map