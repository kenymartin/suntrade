"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleUnitofWork = void 0;
const client_1 = require("@prisma/client");
class SingleUnitofWork {
    constructor() {
        SingleUnitofWork.prismaModel = new client_1.PrismaClient();
    }
    static PrismaModel() {
        if (this.prismaModel == null)
            this.prismaModel = new client_1.PrismaClient();
        return this.prismaModel;
    }
}
exports.SingleUnitofWork = SingleUnitofWork;
exports.default = SingleUnitofWork;
//# sourceMappingURL=CommonService.js.map