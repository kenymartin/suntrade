"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneService = void 0;
const utils_js_1 = require("../../../utils/utils.js");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PhoneService {
    async getAll() {
        try {
            this.result = await prisma.phone.findMany();
        }
        catch (error) {
            console.log(error);
            utils_js_1.ResultError.TriedGetMany("Phone");
        }
        return this.result;
    }
    async update(data) {
        try {
            const id = data.id;
            this.result = await prisma.phone.update({
                where: { id: id },
                data: data,
            });
        }
        catch (error) {
            utils_js_1.ResultError.TriedUpdateOne("Phone");
        }
        return this.result;
    }
    async create(data) {
        try {
            this.result = await prisma.phone.create({ data: data });
        }
        catch (error) {
            utils_js_1.ResultError.TriedCreateOne("Phone");
        }
        return this.result;
    }
    delete(id) {
        try {
            this.result = prisma.phone.delete({ where: { id: id } });
        }
        catch (error) {
            console.log(error);
            utils_js_1.ResultError.TriedDeleteOne("Phone");
        }
        return this.result;
    }
    async getById(id) {
        try {
            this.result = await prisma.phone.findUnique({
                where: { id, isActive: true },
            });
        }
        catch (error) {
            console.log(error);
            utils_js_1.ResultError.TriedGetOne("Phone");
        }
        return this.result;
    }
}
exports.PhoneService = PhoneService;
exports.default = PhoneService;
//# sourceMappingURL=PhoneService.js.map