"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("../../../../backend/utils/utils");
const moment_1 = __importDefault(require("moment"));
const utils_2 = require("../../../../shared/utils/utils");
const enums_1 = require("../../../../shared/utils/enums");
const NotificationService_1 = require("./NotificationService");
const prisma_Client_1 = __importDefault(require("../../../prisma/prisma.Client"));
class UserService {
    applyFilter(options) {
        throw new Error("Method not implemented.");
    }
    delete(id) {
        try {
            this.result = prisma_Client_1.default.user.update({
                where: { id: id },
                select: { id: true },
                data: { isDeleted: true, isActive: false },
            });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.Nofity({ methodName: this.delete.name });
            utils_1.ResultError.TriedDeleteOne("User");
        }
        return this.result;
    }
    getById(id) {
        try {
            this.result = prisma_Client_1.default.user.findUnique({
                where: { id: id, isActive: true },
                select: {
                    username: true,
                    password: true,
                    id: true,
                    RoleByUser: { select: { roleId: true } },
                    Contact: {
                        select: {
                            firstname: true,
                            lastname: true,
                            middlename: true,
                            dob: true,
                            stateId: true,
                            Email: true,
                            Phone: true,
                            Address: true,
                        },
                    },
                },
            });
        }
        catch (error) { }
        return this.result;
    }
    getAll() {
        try {
            this.result = prisma_Client_1.default.user.findMany({
                where: { isActive: true },
                select: {
                    username: true,
                    id: true,
                    RoleByUser: true,
                    Contact: {
                        select: {
                            firstname: true,
                            lastname: true,
                            Address: {
                                select: { street: true, city: true, zipcode: true },
                                where: { isActive: true },
                            },
                            Phone: { select: { phone: true }, where: { isActive: true } },
                            Company: { select: { companyName: true, website: true } },
                        },
                    },
                },
            });
        }
        catch (error) { }
        return this.result;
    }
    update(data) {
        try {
            this.result = prisma_Client_1.default.user.update({ where: { id: data.id }, data });
        }
        catch (error) {
            console.log(error);
        }
        return this.result;
    }
    async ActiveUser(id, isReactivation = false) {
        debugger;
        const now = (0, moment_1.default)().toDate();
        const twentyFourHoursAgo = (0, moment_1.default)().subtract(24, "hours").toDate();
        try {
            const user = await prisma_Client_1.default.user.findUnique({
                where: { contactId: id },
            });
            if (!user) {
                return new utils_2.ProjectError("User not found.");
            }
            if (user.isActive) {
                return new utils_2.ProjectError("User is already active.");
            }
            const isWithinActivationWindow = (0, moment_1.default)(user.createdAt).isBetween(twentyFourHoursAgo, now);
            const isExpired = !isWithinActivationWindow;
            if (!isExpired || (isExpired && isReactivation)) {
                const updatedUser = await prisma_Client_1.default.user.update({
                    where: { contactId: id },
                    data: { isActive: true, updatedAt: now },
                });
                return updatedUser;
            }
            return new utils_2.ProjectError("Activation link has expired.The acount cannot be activated after 24 hours", {
                data: enums_1.AccountActivationError.EL,
            });
        }
        catch (error) {
            return new utils_2.ProjectError(error.message);
        }
    }
    async ReactivateUser(id) {
        debugger;
        try {
            const now = (0, moment_1.default)().toDate();
            const user = await prisma_Client_1.default.user.findUnique({
                where: { contactId: id },
            });
            if (!user) {
                return new utils_2.ProjectError("User not found.");
            }
            if (user.isActive) {
                return new utils_2.ProjectError("User is already active.");
            }
            const updateUser = await prisma_Client_1.default.user.update({
                where: {
                    contactId: id,
                },
                data: {
                    isActive: true,
                    updatedAt: now,
                },
            });
            return updateUser;
        }
        catch (error) {
            return new utils_2.ProjectError(error.message);
        }
    }
    async ForgotPasswordLink(email) {
        debugger;
        let result = false;
        try {
            result = await this.ResendLink(email, enums_1.NotificationType.ChangePassword);
        }
        catch (error) {
            return new utils_2.ProjectError("Could not reset password link");
        }
        return result;
    }
    async ResendLink(key, notificationtype) {
        let user;
        try {
            if (typeof key === "string") {
                user = await prisma_Client_1.default.user.findUnique({
                    where: { email: key },
                    select: { contactId: true, email: true },
                });
                if (!user) {
                    return new utils_2.ProjectError("User not found.");
                }
            }
            if (typeof key === "number") {
                user = await prisma_Client_1.default.user.findUnique({
                    where: { contactId: key },
                    select: { contactId: true, email: true },
                });
                if (!user) {
                    return new utils_2.ProjectError("User not found.");
                }
            }
            const emailOptions = {
                to: user?.email,
                from: "", // This will be set by the NotificationService
                subject: "", // This will be set by the NotificationService
                html: "", // This will be set by the NotificationService
                key: user?.contactId, // This will be set by the NotificationService/ This will be set by the NotificationService
                app: { page: 'forgot-password' }
            };
            const callback = (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                }
                else {
                    console.log("Email sent successfully:");
                }
            };
            return new Promise((resolve) => {
                resolve(NotificationService_1.NotificationService.sendNotification(notificationtype, emailOptions, callback));
            });
        }
        catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
    async ResendActivationLink(id) {
        debugger;
        try {
            const user = await prisma_Client_1.default.user.findUnique({
                where: { contactId: id },
                select: { email: true, contactId: true },
            });
            const emailOptions = {
                to: user?.email,
                from: "", // This will be set by the NotificationService
                subject: "", // This will be set by the NotificationService
                html: "", // This will be set by the NotificationService
                key: user?.contactId, // This will be set by the NotificationService/ This will be set by the NotificationService
            };
            const callback = (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                }
                else {
                    console.log("Email sent successfully:");
                }
            };
            return new Promise((resolve) => {
                resolve(NotificationService_1.NotificationService.sendNotification(enums_1.NotificationType.Reactivation, emailOptions, callback));
            });
        }
        catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
    async ChangePassword(id, password) {
        debugger;
        let result;
        try {
            const hashPassword = bcrypt_1.default.hashSync(password, 10);
            result = await prisma_Client_1.default.user.update({ where: { contactId: id, isActive: true }, data: { password: hashPassword } });
            return result;
        }
        catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
    // applyFilter(
    //   options: any
    // ): Promise<
    //   (GetResult<
    //     {
    //       id: number;
    //       contactId: number;
    //       username: string;
    //       email: string;
    //       password: string;
    //       isActive: boolean;
    //       createdAt: Date;
    //       createdBy: number;
    //       updatedAt: Date;
    //       updatedBy: number;
    //       isDeleted: boolean;
    //       scalars: any;
    //       objects: any;
    //       composites: any;
    //     },
    //     any
    //   > & {})[]
    // > {
    //   try {
    //     const { selec, where, orderBy, take, skip } = options;
    //     return null;
    //   } catch (error) {}
    // }
    getByUsername(username, password) {
        debugger;
        try {
            this.result = prisma_Client_1.default.user.findUnique({
                where: { username: username, password: password, isActive: true },
                select: {
                    username: true,
                    password: true,
                    id: true,
                    Contact: {
                        select: {
                            firstname: true,
                            lastname: true,
                            Address: {
                                select: {
                                    street: true,
                                    city: true,
                                    state: true,
                                    zipcode: true,
                                },
                                where: { isActive: true },
                            },
                            Phone: {
                                select: { phone: true, phoneTypeId: true },
                                where: { isActive: true },
                            },
                        },
                    },
                },
            });
        }
        catch (error) {
            console.log(error);
        }
        return this.result;
    }
    getByEmail(email) {
        try {
            this.result = prisma_Client_1.default.user.findUnique({
                where: { email: email },
                select: {
                    username: true,
                    password: true,
                    Contact: {
                        select: {
                            firstname: true,
                            lastname: true,
                            Address: {
                                select: {
                                    street: true,
                                    city: true,
                                    state: true,
                                    zipcode: true,
                                },
                                where: { isActive: true },
                            },
                            Phone: {
                                select: { phone: true, phoneTypeId: true },
                                where: { isActive: true },
                            },
                        },
                    },
                    //roleByUser: { select: { roleId: true }, where: { isActive: true } },
                },
            });
        }
        catch (error) { }
        return this.result;
    }
    async checkUserName(username) {
        this.result = null;
        try {
            this.result = await prisma_Client_1.default.user.findUnique({
                where: { username: username },
            });
            return { isTaken: !!this.result };
        }
        catch (error) {
            console.error("Error checking username", error);
            throw error;
        }
    }
}
exports.UserService = UserService;
exports.default = UserService;
//# sourceMappingURL=Userservice.js.map