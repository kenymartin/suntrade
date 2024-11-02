"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const client_1 = require("@prisma/client");
const utils_1 = require("../../../utils/utils");
const prisma = new client_1.PrismaClient();
class AddressService {
    async getById(id) {
        try {
            this.result = await prisma.address.findUnique({ where: { id: id } });
        }
        catch (error) {
            console.log(error);
            //ResultError.TriedGetOne("Address");
        }
        return this.result;
    }
    async getAll() {
        try {
            this.result = await prisma.address.findMany({
                where: { isDeleted: false },
            });
        }
        catch (error) {
            console.log(error);
            //ResultError.TriedGetMany("Address");
        }
        return this.result;
    }
    async update(data) {
        try {
            this.result = await prisma.address.update({
                where: { id: data.id },
                data,
            });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedUpdateOne("Address");
        }
        return this.result;
    }
    async create(data) {
        try {
            this.result = await prisma.address.create({ data });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedCreateOne("Address");
        }
        return this.result;
    }
    async delete(id) {
        try {
            this.result = await prisma.address.delete({ where: { id: id } });
        }
        catch (error) {
            console.log(error);
            utils_1.ResultError.TriedDeleteOne("Address");
        }
        return this.result;
    }
}
exports.AddressService = AddressService;
//# sourceMappingURL=AddressService.js.map