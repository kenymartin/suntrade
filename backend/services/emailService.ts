import { Email } from "@prisma/client";
import BaseService from "./BaseService";
import ICrud from "./interfaces/ICrud";
import { ResultError } from "../shared/utils/utils";

export default class EmailService extends BaseService implements ICrud<Email> {
    result: any;
    async getById(id: number): Promise<{ id: number; contactId: number; email: string; emailTypeId: number; isPrimary: boolean; companyId: number; createdAt: Date; createdBy: number; updatedAt: Date; updatedBy: number; isDeleted: boolean; }> {
        try {
            this.result = await this.prisma.email.findUnique({  where: { id: id } });
        } catch (error) {
            console.log(error);
            ResultError.TriedGetOne('Email')
        }
        return this.result;
    }
    async getAll(): Promise<{ id: number; contactId: number; email: string; emailTypeId: number; isPrimary: boolean; companyId: number; createdAt: Date; createdBy: number; updatedAt: Date; updatedBy: number; isDeleted: boolean; }[]> {
        try {
            this.result = await this.prisma.email.findMany();
        } catch (error) {
            console.log(error);
            ResultError.TriedGetMany('Email')
        }
        return this.result;
    }
    async update(data: { id: number; contactId: number; email: string; emailTypeId: number; isPrimary: boolean; companyId: number; createdAt: Date; createdBy: number; updatedAt: Date; updatedBy: number; isDeleted: boolean; }): Promise<{ id: number; contactId: number; email: string; emailTypeId: number; isPrimary: boolean; companyId: number; createdAt: Date; createdBy: number; updatedAt: Date; updatedBy: number; isDeleted: boolean; }> {
        try {
            this.result = await this.prisma.email.update({ where: { id: data.id }, data})
        } catch (error) {
            console.log(error);
            ResultError.TriedUpdateOne('Email')
        }
        return this.result;
    }
    async create(data: { id: number; contactId: number; email: string; emailTypeId: number; isPrimary: boolean; companyId: number; createdAt: Date; createdBy: number; updatedAt: Date; updatedBy: number; isDeleted: boolean; }): Promise<{ id: number; contactId: number; email: string; emailTypeId: number; isPrimary: boolean; companyId: number; createdAt: Date; createdBy: number; updatedAt: Date; updatedBy: number; isDeleted: boolean; }> {
        try {
            this.result = await this.prisma.email.create({ data })
        } catch (error) {
            console.log(error);
            ResultError.TriedCreateOne('Email')
        }
        return this.result;
    }
    async delete(id: number): Promise<number> {
       try {
        this.result = await this.prisma.email.delete({ where: { id: id } })
        
       } catch (error) {
        console.log(error);
        ResultError.TriedDeleteOne('Email')
       }
       return this.result;
    }
    
}