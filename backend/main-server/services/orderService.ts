import {Order, PrismaClient} from '@prisma/client';
import Icrud from './interfaces/ICrud'
import {ResultError} from "../shared/utils/utils.js"

const prisma = new PrismaClient();
export default class OrderService implements Icrud<Order> {
    result: any;
    async getById(id: number): Promise<Order> {
        try {
            this.result = await prisma.order.findUnique({where: {id: id}});
        } catch (error) {
            console.log(error);
            ResultError.TriedGetOne('Order')
        }
        return this.result;
    }
    async getAll(): Promise<Order[]> {
        try {
            this.result = await prisma.order.findMany({where: {isDeleted:false}});
        } catch (error) {
            console.log(error);
            ResultError.TriedGetMany('Order')
        }
        return this.result;
    }
    async update(data: Order): Promise<Order> {
       try {
         this.result = await prisma.order.update({where: {id: data.id}, data});
       } catch (error) {
        console.log(error);
        ResultError.TriedUpdateOne('Order')
       }
       return this.result;
    }
    async create(data: Order): Promise<Order> {
        try {
            this.result = await prisma.order.create({data});
        } catch (error) {
            console.log(error);
            ResultError.TriedCreateOne('Order')
        }
        return this.result;
    }
    async delete(id: number): Promise<number> {
        try {
            this.result = await prisma.order.delete({where: {id: id}});
        } catch (error) {
            console.log(error);
            ResultError.TriedDeleteOne('Order')
        }
        return this.result;
    }
    
}