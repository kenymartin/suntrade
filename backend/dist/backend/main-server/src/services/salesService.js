"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesService = void 0;
const client_1 = require("@prisma/client");
const utils_1 = require("../../../../backend/utils/utils");
const prisma = new client_1.PrismaClient();
class SalesService {
    getById(id) {
        try {
            this.result = prisma.sales.findUnique({ where: { id } });
        }
        catch (error) {
            utils_1.ResultError.TriedGetOne("Sales");
        }
        return this.result;
    }
    getAll() {
        try {
            this.result = prisma.sales.findMany();
        }
        catch (error) {
            utils_1.ResultError.TriedGetMany("Sales");
        }
        return this.result;
    }
    update(data) {
        try {
            const { id } = data;
            this.result = prisma.sales.update({ where: { id }, data });
        }
        catch (error) {
            utils_1.ResultError.TriedUpdateOne("Sales");
        }
        return this.result;
    }
    create(data) {
        try {
            this.result = prisma.sales.create({
                data,
            });
        }
        catch (error) {
            utils_1.ResultError.TriedCreateOne("Sales");
        }
        return this.result;
    }
    delete(id) {
        try {
            this.result = prisma.sales.delete({ where: { id } });
        }
        catch (error) {
            utils_1.ResultError.TriedDeleteOne("Sales");
        }
        return this.result;
    }
}
exports.SalesService = SalesService;
//# sourceMappingURL=salesService.js.map