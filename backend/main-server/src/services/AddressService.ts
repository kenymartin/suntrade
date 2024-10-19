import { PrismaClient } from "@prisma/client";
import ICrud from "./interfaces/ICrud";
import {Address}  from "@prisma/client";
import{ ResultError } from "../../../utils/utils";
const prisma = new PrismaClient();
export class AddressService implements ICrud<Address> {
  result: any;
  async getById(id: number): Promise<Address> {
    try {
      this.result = await prisma.address.findUnique({ where: { id: id } });
    } catch (error) {
      console.log(error);
      //ResultError.TriedGetOne("Address");
    }
    return this.result;
  }
  async getAll(): Promise<Address[]> {
    try {
      this.result = await prisma.address.findMany({
        where: { isDeleted: false },
      });
    } catch (error) {
      console.log(error);
      //ResultError.TriedGetMany("Address");
    }
    return this.result;
  }
  async update(data: Address): Promise<Address> {
    try {
      this.result = await prisma.address.update({
        where: { id: data.id },
        data,
      });
    } catch (error) {
      console.log(error);
      ResultError.TriedUpdateOne("Address");
    }
    return this.result;
  }
  async create(data: Address): Promise<Address> {
    try {
      this.result = await prisma.address.create({ data });
    } catch (error) {
      console.log(error);
      ResultError.TriedCreateOne("Address");
    }
    return this.result;
  }
  async delete(id: number): Promise<number> {
    try {
      this.result = await prisma.address.delete({ where: { id: id } });
    } catch (error) {
      console.log(error);
      ResultError.TriedDeleteOne("Address");
    }
    return this.result;
  }
}
