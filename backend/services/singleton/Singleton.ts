import { PrismaClient } from "@prisma/client";

export class Singleton extends PrismaClient {
  static instance: any;
  readonly prisma: PrismaClient;
  constructor() {
    super();
    if (!Singleton.instance) {
      this.prisma = new PrismaClient();
      Singleton.instance = this;
    }
    return Singleton.instance;
  }

  async connect() {
    return this.prisma.$connect();
  }

  async disconnect() {
    return this.prisma.$disconnect();
  }
}
export default Singleton;
