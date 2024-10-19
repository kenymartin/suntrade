"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("./BaseService"));
const utils_1 = require("../../../../backend/utils/utils");
class EmailService extends BaseService_1.default {
    async getById(id) {
        try {
            this.result = await this.prisma.email.findUnique({ where: { id: id } });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedGetOne("Email");
        }
        return this.result;
    }
    async getAll() {
        try {
            this.result = await this.prisma.email.findMany();
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedGetMany("Email");
        }
        return this.result;
    }
    async update(data) {
        try {
            this.result = await this.prisma.email.update({
                where: { id: data.id },
                data,
            });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedUpdateOne("Email");
        }
        return this.result;
    }
    async create(data) {
        try {
            this.result = await this.prisma.email.create({ data });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedCreateOne("Email");
        }
        return this.result;
    }
    async delete(id) {
        try {
            this.result = await this.prisma.email.delete({ where: { id: id } });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedDeleteOne("Email");
        }
        return this.result;
    }
}
exports.default = EmailService;
//# sourceMappingURL=emailService.js.map