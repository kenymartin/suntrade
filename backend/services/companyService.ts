import {Company} from "@prisma/client"
import BaseService from "./BaseService";
import ICrud from "./interfaces/ICrud";
import {ResultError} from "../shared/utils/utils"

export default class CompanyService extends BaseService implements ICrud<Company> {
    result: any;
    async getById(id: number): Promise<Company> {
       
        try {
            this.result = await this.prisma.company.findUnique({where: {id}});
        } catch (error) {
            console.log(error);
            ResultError.TriedGetOne('Company');
        }
        return this.result;
    }
    async getAll(): Promise<Company[]> {
        try {
            this.result = await this.prisma.company.findMany();
        } catch (error) {
          console.log(error);
          ResultError.TriedGetMany('Company');
        }
        return this.result;
    }
    async update(data: Company): Promise<Company> {
        try {
            this.result = await this.prisma.company.update({where: {id: data.id},data})
        } catch (error) {
            console.log(error);
            ResultError.TriedUpdateOne('Company');       
        }
        return this.result;
    }
    async create(data: Company): Promise<Company> {
        try {
            this.result = await this.prisma.company.create({data})
        } catch (error) {
          console.log(error);
          ResultError.TriedCreateOne('Company');  
        }
        return this.result;
    }
    async delete(id: number): Promise<number> {
        try {
            this.result = await this.prisma.company.delete({where: {id}});
        } catch (error) {
            console.log(error);
            ResultError.TriedDeleteOne('Company');
        }
        return this.result
    }
    
}