import { Email } from "@prisma/client";
import BaseService from "./BaseService";
import ICrud from "./interfaces/ICrud";
import { ResultError } from "../shared/utils/utils";

export default class EmailService extends BaseService implements ICrud<Email> {
  result: any;
  async getById(id: number): Promise<Email> {
    try {
      this.result = await this.prisma.email.findUnique({ where: { id: id } });
    } catch (error) {
      console.log(error);
      ResultError.TriedGetOne("Email");
    }
    return this.result;
  }
  async getAll(): Promise<Email[]> {
    try {
      this.result = await this.prisma.email.findMany();
    } catch (error) {
      console.log(error);
      ResultError.TriedGetMany("Email");
    }
    return this.result;
  }
  async update(data: Email): Promise<Email> {
    try {
      this.result = await this.prisma.email.update({
        where: { id: data.id },
        data,
      });
    } catch (error) {
      console.log(error);
      ResultError.TriedUpdateOne("Email");
    }
    return this.result;
  }
  async create(data: Email): Promise<Email> {
    try {
      this.result = await this.prisma.email.create({ data });
    } catch (error) {
      console.log(error);
      ResultError.TriedCreateOne("Email");
    }
    return this.result;
  }
  async delete(id: number): Promise<number> {
    try {
      this.result = await this.prisma.email.delete({ where: { id: id } });
    } catch (error) {
      console.log(error);
      ResultError.TriedDeleteOne("Email");
    }
    return this.result;
  }
}
