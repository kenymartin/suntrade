"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesService = void 0;
var client_1 = require("@prisma/client");
var utils_1 = require("../../../../backend/utils/utils");
//import { ResultError } from "@backend/utils/utils";
var prisma = new client_1.PrismaClient();
var SalesService = /** @class */ (function () {
    function SalesService() {
    }
    SalesService.prototype.getById = function (id) {
        try {
            this.result = prisma.sales.findUnique({ where: { id: id } });
        }
        catch (error) {
            utils_1.ResultError.TriedGetOne("Sales");
        }
        return this.result;
    };
    SalesService.prototype.getAll = function () {
        try {
            this.result = prisma.sales.findMany();
        }
        catch (error) {
            utils_1.ResultError.TriedGetMany("Sales");
        }
        return this.result;
    };
    SalesService.prototype.update = function (data) {
        try {
            var id = data.id;
            this.result = prisma.sales.update({ where: { id: id }, data: data });
        }
        catch (error) {
            utils_1.ResultError.TriedUpdateOne("Sales");
        }
        return this.result;
    };
    SalesService.prototype.create = function (data) {
        try {
            this.result = prisma.sales.create({
                data: data,
            });
        }
        catch (error) {
            utils_1.ResultError.TriedCreateOne("Sales");
        }
        return this.result;
    };
    SalesService.prototype.delete = function (id) {
        try {
            this.result = prisma.sales.delete({ where: { id: id } });
        }
        catch (error) {
            utils_1.ResultError.TriedDeleteOne("Sales");
        }
        return this.result;
    };
    return SalesService;
}());
exports.SalesService = SalesService;
//# sourceMappingURL=salesService.js.map