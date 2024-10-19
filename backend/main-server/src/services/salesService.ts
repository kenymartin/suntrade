import ICrud from "./interfaces/ICrud";
import { Sales, PrismaClient } from "@prisma/client";
import { ResultError } from "../../../../backend/utils/utils";

const prisma = new PrismaClient();

export class SalesService implements ICrud<Sales> {
  result: any;
  getById(id: any): Promise<Sales> {
    try {
      this.result = prisma.sales.findUnique({ where: { id } });
    } catch (error) {
      ResultError.TriedGetOne("Sales");
    }
    return this.result;
  }
  getAll(): Promise<Sales[]> {
    try {
      this.result = prisma.sales.findMany();
    } catch (error) {
      ResultError.TriedGetMany("Sales");
    }
    return this.result;
  }
  update(data: Sales): Promise<Sales> {
    try {
      const { id } = data;
      this.result = prisma.sales.update({ where: { id }, data });
    } catch (error) {
      ResultError.TriedUpdateOne("Sales");
    }
    return this.result;
  }
  create(data: any): Promise<Sales> {
    try {
      this.result = prisma.sales.create({
        data,
      });
    } catch (error) {
      ResultError.TriedCreateOne("Sales");
    }
    return this.result;
  }
  delete(id: any): Promise<number> {
    try {
      this.result = prisma.sales.delete({ where: { id } });
    } catch (error) {
      ResultError.TriedDeleteOne("Sales");
    }
    return this.result;
  }
}
