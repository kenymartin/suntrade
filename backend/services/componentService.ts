import { Component } from "@prisma/client";
import BaseService from "./BaseService";
import Icrud from "./interfaces/ICrud";
import { ResultError } from "../shared/utils/utils";

export default class SolarPanelComponentService extends BaseService implements Icrud<Component>
{
  result: any;
  async getById(id: number): Promise<Component> {
    try {
      this.result = await this.prisma.component.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
      ResultError.TriedGetOne("Component");
    }
    return this.result;
  }
  async getAll(): Promise<Component[]> {
    try {
      this.result = await this.prisma.component.findMany();
    } catch (error) {
      console.log(error);
      ResultError.TriedGetMany("Component");
    }
    return this.result;
  }
  async update(data: Component): Promise<Component> {
    try {
      this.result = await this.prisma.component.update({
        where: { id: data.id },
        data,
      });
    } catch (error) {
      console.log(error);
      ResultError.TriedUpdateOne("Component");
    }
    return this.result;
  }
  async create(data: Component): Promise<Component> {
    try {
      this.result = await this.prisma.component.create({ data });
    } catch (error) {
      console.log(error);
      ResultError.TriedCreateOne("Component");
    }
    return this.result;
  }
  async delete(id: number): Promise<number> {
    try {
      this.result = await this.prisma.component.delete({ where: { id: id } });
    } catch (error) {
      console.log(error);
      ResultError.TriedDeleteOne("Component");
    }
    return this.result;
  }
}
