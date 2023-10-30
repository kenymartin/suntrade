import { PrismaClient, User } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime/library";
import IReadable from "./interfaces/IReadable";
import IFilter from "./interfaces/IFilter";
import { ResultError } from "../shared/utils/utils.js";

const prisma = new PrismaClient();

export class UserService implements IReadable<User>, IFilter<User> {
  delete(id: string): Promise<string> {
    try {
      this.result = prisma.user.update({
        where: { id: id },
        select: { id: true },
        data: { isDeleted: true, isActive: false },
      });
    } catch (error) {
      console.log(error);
      ResultError.Nofity({ methodName: this.delete.name });
      ResultError.TriedDeleteOne("User");
    }
    return this.result;
  }
  result: any;
  getById(id: string): Promise<User> {
    try {
      this.result = prisma.user.findUnique({
        where: { id: id, isActive: true },
        select: {
          username: true,
          id: true,
          roleByUser: { select: { roleId: true } },
          contact: {
            select: {
              firstname: true,
              lastname: true,
              id: true,
              Address: {
                select: {
                  street: true,
                  city: true,
                  state: true,
                  country: true,
                  contactId: true,
                  addressTypeId: true,
                },
              },
              Phone: { select: { phone: true, phoneTypeId: true } },
              Company: { select: { companyName: true, website: true } },
            },
          },
        },
      });
      return this.result;
    } catch (error) {}
  }
  getAll(): Promise<User[]> {
    try {
      this.result = prisma.user.findMany({
        where: { isActive: true },
        select: {
          username: true,
          id: true,
          roleByUser: {
            select: { role: { select: { id: true } } },
            where: { isActive: true },
          },
          contact: {
            select: {
              firstname: true,
              lastname: true,
              Address: {
                select: { street: true, city: true, zipcode: true },
                where: { isActive: true },
              },
              Phone: { select: { phone: true }, where: { isActive: true } },
              Company: { select: { companyName: true, website: true } },
            },
          },
        },
      });
      return this.result;
    } catch (error) {}
  }
  update( data: User ): Promise<User> {
     try {
      this.result = prisma.user.update({ where: { id: data.id }, data });
     
    } catch (error) {
      console.log(error);
    }
    return this.result;
  }
  applyFilter(options: any): Promise<
    (GetResult<
      {
        id: number;
        contactId: number;
        username: string;
        email: string;
        password: string;
        isActive: boolean;
        createdAt: Date;
        createdBy: number;
        updatedAt: Date;
        updatedBy: number;
        isDeleted: boolean;
        scalars: any;
        objects: any;
        composites: any;
      },
      any
    > & {})[]
  > {
    try {
      const { selec, where, orderBy, take, skip } = options;
      return null;
    } catch (error) {}
  }
  getByUsername(
    username: string,
    password?: string
  ): Promise<
    GetResult<
      {
        id: number;
        contactId: number;
        username: string;
        email: string;
        password: string;
        isActive: boolean;
        createdAt: Date;
        createdBy: number;
        updatedAt: Date;
        updatedBy: number;
        isDeleted: boolean;
        scalars: any;
        objects: any;
        composites: any;
      },
      any
    > & {}
  > {
    try {
      this.result = prisma.user.findUnique({
        where: { username: username, password: password },
        select: {
          username: true,
          password: true,
          id: true,
          contact: {
            select: {
              firstname: true,
              lastname: true,
              Address: {
                select: {
                  street: true,
                  city: true,
                  state: true,
                  zipcode: true,
                },
                where: { isActive: true },
              },
              Phone: {
                select: { phone: true, phoneTypeId: true },
                where: { isActive: true },
              },
            },
          },
          roleByUser: { select: { roleId: true }, where: { isActive: true } },
        },
      });
      return this.result;
    } catch (error) {}
  }
  getByEmail(email: string): Promise<
    GetResult<
      {
        id: number;
        contactId: number;
        username: string;
        email: string;
        password: string;
        isActive: boolean;
        createdAt: Date;
        createdBy: number;
        updatedAt: Date;
        updatedBy: number;
        isDeleted: boolean;
        scalars: any;
        objects: any;
        composites: any;
      },
      any
    > & {}
  > {
    try {
      this.result = prisma.user.findUnique({
        where: { email: email },
        select: {
          username: true,
          password: true,
          contact: {
            select: {
              firstname: true,
              lastname: true,
              Address: {
                select: {
                  street: true,
                  city: true,
                  state: true,
                  zipcode: true,
                },
                where: { isActive: true },
              },
              Phone: {
                select: { phone: true, phoneTypeId: true },
                where: { isActive: true },
              },
            },
          },
          roleByUser: { select: { roleId: true }, where: { isActive: true } },
        },
      });
      return this.result;
    } catch (error) {}
  }
}

export default UserService;
