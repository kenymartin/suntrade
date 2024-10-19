import ICrud from "./interfaces/ICrud";
import { ResultError } from "../../../utils/utils.js";
import { Phone, PrismaClient } from "@prisma/client";
import BaseService from "./BaseService";
const prisma = new PrismaClient();
export class PhoneService implements ICrud<Phone> {
  result: any;
  async getAll(): Promise<Phone[]> {
    try {
      this.result = await prisma.phone.findMany();
    } catch (error) {
      console.log(error);
      ResultError.TriedGetMany("Phone");
    }
    return this.result;
  }
  async update(data: Phone): Promise<Phone> {
    try {
      const id = data.id;
      this.result = await prisma.phone.update({
        where: { id: id },
        data: data,
      });
    } catch (error) {
      ResultError.TriedUpdateOne("Phone");
    }
    return this.result;
  }
  async create(data: Phone): Promise<Phone> {
    try {
      this.result = await prisma.phone.create({ data: data });
    } catch (error) {
      ResultError.TriedCreateOne("Phone");
    }
    return this.result;
  }
  delete(id: number): Promise<number> {
    try {
      this.result = prisma.phone.delete({ where: { id: id } });
    } catch (error) {
      console.log(error);
      ResultError.TriedDeleteOne("Phone");
    }
    return this.result;
  }
  async getById(id: number): Promise<Phone> {
    try {
      this.result = await prisma.phone.findUnique({
        where: { id, isActive: true },
      });
    } catch (error) {
      console.log(error);
      ResultError.TriedGetOne("Phone");
    }
    return this.result;
  }
}
export default PhoneService;
