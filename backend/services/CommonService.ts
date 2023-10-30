import { PrismaClient } from "@prisma/client";
export class SingleUnitofWork {
  private static prismaModel: PrismaClient;
  private constructor() {
    SingleUnitofWork.prismaModel =new PrismaClient()
  }
  static PrismaModel() {
    if (this.prismaModel == null) this.prismaModel = new PrismaClient();
    return this.prismaModel;
  }
}

export default SingleUnitofWork;
