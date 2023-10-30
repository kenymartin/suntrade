import { Address, PrismaClient } from "@prisma/client";
import ICrud from "./interfaces/ICrud";
import { ResultError } from "../shared/utils/utils.js";
import BaseService from "./BaseService";
const prisma = new PrismaClient();
export class AddressService extends BaseService implements ICrud<Address> {
  result: any;
  async getById(id: number): Promise<{ id: number; street: string; city: string; state: string; zidcode: string; country: string; contactId: number; addressTypeId: number; companyId: number; createdAt: Date; createdBy: number; updatedAt: Date; isActive: boolean; updatedBy: number; isDeleted: boolean; }> {
    try {
      this.result = await prisma.address.findUnique({where: {id: id}});
    } catch (error) {
      console.log(error);
      ResultError.TriedGetOne('Address')
    }
    return this.result;
  }
  async getAll(): Promise<{ id: number; street: string; city: string; state: string; zidcode: string; country: string; contactId: number; addressTypeId: number; companyId: number; createdAt: Date; createdBy: number; updatedAt: Date; isActive: boolean; updatedBy: number; isDeleted: boolean; }[]> {
    try {
      this.result = await prisma.address.findMany({where: {isDeleted: false}});
    } catch (error) {
      console.log(error);
      ResultError.TriedGetMany('Address')
    }
    return this.result;
  }
  async update(data: { id: number; street: string; city: string; state: string; zidcode: string; country: string; contactId: number; addressTypeId: number; companyId: number; createdAt: Date; createdBy: number; updatedAt: Date; isActive: boolean; updatedBy: number; isDeleted: boolean; }): Promise<{ id: number; street: string; city: string; state: string; zidcode: string; country: string; contactId: number; addressTypeId: number; companyId: number; createdAt: Date; createdBy: number; updatedAt: Date; isActive: boolean; updatedBy: number; isDeleted: boolean; }> {
    try {
      this.result = await prisma.address.update({where: {id: data.id}, data})
    } catch (error) {
      console.log(error);
      ResultError.TriedUpdateOne('Address')
    }
    return this.result;

  }
  async create(data: { id: number; street: string; city: string; state: string; zidcode: string; country: string; contactId: number; addressTypeId: number; companyId: number; createdAt: Date; createdBy: number; updatedAt: Date; isActive: boolean; updatedBy: number; isDeleted: boolean; }): Promise<{ id: number; street: string; city: string; state: string; zidcode: string; country: string; contactId: number; addressTypeId: number; companyId: number; createdAt: Date; createdBy: number; updatedAt: Date; isActive: boolean; updatedBy: number; isDeleted: boolean; }> {
    try {
      this.result = await prisma.address.create({data})
    } catch (error) {
      console.log(error);
      ResultError.TriedCreateOne('Address')
    }
    return this.result;
  }
  async delete(id: number): Promise<number> {
    try {
      this.result = await prisma.address.delete({where: {id: id}})
    } catch (error) {
      console.log(error);
      ResultError.TriedDeleteOne('Address')
    }
    return this.result;
  }
 
  
}
