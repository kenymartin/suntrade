"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const utils_1 = require("../../../../backend/utils/utils");
// import { ResultError } from "../../../utils/utils";
const prisma = new client_1.PrismaClient();
class OrderService {
    async getById(id) {
        try {
            this.result = await prisma.order.findUnique({ where: { id: id } });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedGetOne("Order");
        }
        return this.result;
    }
    async getAll() {
        try {
            this.result = await prisma.order.findMany({
                where: { isDeleted: false },
            });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedGetMany("Order");
        }
        return this.result;
    }
    async update(data) {
        try {
            this.result = await prisma.order.update({ where: { id: data.id }, data });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedUpdateOne("Order");
        }
        return this.result;
    }
    async create(data) {
        try {
            this.result = await prisma.order.create({ data });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedCreateOne("Order");
        }
        return this.result;
    }
    async delete(id) {
        try {
            this.result = await prisma.order.delete({ where: { id: id } });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedDeleteOne("Order");
        }
        return this.result;
    }
}
exports.default = OrderService;
//# sourceMappingURL=orderService.js.map