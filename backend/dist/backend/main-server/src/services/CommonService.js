"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleUnitofWork = void 0;
var client_1 = require("@prisma/client");
var SingleUnitofWork = /** @class */ (function () {
    function SingleUnitofWork() {
        SingleUnitofWork.prismaModel = new client_1.PrismaClient();
    }
    SingleUnitofWork.PrismaModel = function () {
        if (this.prismaModel == null)
            this.prismaModel = new client_1.PrismaClient();
        return this.prismaModel;
    };
    return SingleUnitofWork;
}());
exports.SingleUnitofWork = SingleUnitofWork;
exports.default = SingleUnitofWork;
//# sourceMappingURL=CommonService.js.map