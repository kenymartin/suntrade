"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("./BaseService"));
const utils_1 = require("../../../utils/utils");
class CompanyService extends BaseService_1.default {
    async getById(id) {
        try {
            this.result = await this.prisma.company.findUnique({ where: { id } });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedGetOne("Company");
        }
        return this.result;
    }
    async getAll() {
        try {
            this.result = await this.prisma.company.findMany();
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedGetMany("Company");
        }
        return this.result;
    }
    async update(data) {
        try {
            this.result = await this.prisma.company.update({
                where: { id: data.id },
                data,
            });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedUpdateOne("Company");
        }
        return this.result;
    }
    async create(data) {
        try {
            this.result = await this.prisma.company.create({ data });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedCreateOne("Company");
        }
        return this.result;
    }
    async delete(id) {
        try {
            this.result = await this.prisma.company.delete({ where: { id } });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedDeleteOne("Company");
        }
        return this.result;
    }
}
exports.default = CompanyService;
//# sourceMappingURL=companyService.js.map