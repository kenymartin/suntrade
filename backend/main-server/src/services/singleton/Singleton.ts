import { PrismaClient } from "@prisma/client";

export class Singleton extends PrismaClient {
  private static instance: any;
  public readonly prisma: PrismaClient | undefined;
  constructor() {
    super();
    if (!Singleton.instance) {
      this.prisma = new PrismaClient();
      Singleton.instance = this;
    }
    return Singleton.instance;
  }

  private async connect() {
    return this.prisma?.$connect();
  }

  private async disconnect() {
    return this.prisma?.$disconnect();
  }
}
export default Singleton;
