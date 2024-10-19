"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("./BaseService"));
const utils_1 = require("../../../utils/utils");
class SolarPanelComponentService extends BaseService_1.default {
    async getById(id) {
        try {
            this.result = await this.prisma.component.findUnique({
                where: { id: id },
            });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedGetOne("Component");
        }
        return this.result;
    }
    async getAll() {
        try {
            this.result = await this.prisma.component.findMany();
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedGetMany("Component");
        }
        return this.result;
    }
    async update(data) {
        try {
            this.result = await this.prisma.component.update({
                where: { id: data.id },
                data,
            });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedUpdateOne("Component");
        }
        return this.result;
    }
    async create(data) {
        try {
            this.result = await this.prisma.component.create({ data });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedCreateOne("Component");
        }
        return this.result;
    }
    async delete(id) {
        try {
            this.result = await this.prisma.component.delete({ where: { id: id } });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedDeleteOne("Component");
        }
        return this.result;
    }
}
exports.default = SolarPanelComponentService;
//# sourceMappingURL=componentService.js.map