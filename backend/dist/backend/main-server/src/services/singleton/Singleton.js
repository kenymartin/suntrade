"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = void 0;
const client_1 = require("@prisma/client");
class Singleton extends client_1.PrismaClient {
    constructor() {
        super();
        if (!Singleton.instance) {
            this.prisma = new client_1.PrismaClient();
            Singleton.instance = this;
        }
        return Singleton.instance;
    }
    async connect() {
        return this.prisma?.$connect();
    }
    async disconnect() {
        return this.prisma?.$disconnect();
    }
}
exports.Singleton = Singleton;
exports.default = Singleton;
//# sourceMappingURL=Singleton.js.map