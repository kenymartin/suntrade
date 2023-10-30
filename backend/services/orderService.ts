import {Order} from '@prisma/client';
import BaseService from './BaseService'
import Icrud from './interfaces/ICrud'
import {ResultError} from "../shared/utils/utils"
import { Decimal } from '@prisma/client/runtime/library';

export default class OrderService extends BaseService implements Icrud<Order> {
    result: any;
    async getById(id: number): Promise<Order> {
        try {
            this.result = await this.prisma.order.findUnique({where: {id: id}});
        } catch (error) {
            console.log(error);
            ResultError.TriedGetOne('Order')
        }
        return this.result;
    }
    async getAll(): Promise<Order[]> {
        try {
            this.result = await this.prisma.order.findMany({where: {isDeleted:false}});
        } catch (error) {
            console.log(error);
            ResultError.TriedGetMany('Order')
        }
        return this.result;
    }
    async update(data: Order): Promise<Order> {
       try {
         this.result = await this.prisma.order.update({where: {id: data.id}, data});
       } catch (error) {
        console.log(error);
        ResultError.TriedUpdateOne('Order')
       }
       return this.result;
    }
    async create(data: Order): Promise<Order> {
        try {
            this.result = await this.prisma.order.create({data});
        } catch (error) {
            console.log(error);
            ResultError.TriedCreateOne('Order')
        }
        return this.result;
    }
    async delete(id: number): Promise<number> {
        try {
            this.result = await this.prisma.order.delete({where: {id: id}});
        } catch (error) {
            console.log(error);
            ResultError.TriedDeleteOne('Order')
        }
        return this.result;
    }
    
}