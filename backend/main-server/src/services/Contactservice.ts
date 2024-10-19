'use strict';
// #region Imports
import { PrismaClient, Contact, Prisma } from "@prisma/client";
import ICrud from "./interfaces/ICrud.js";
import IFilter from "./interfaces/IFilter.js";
import bcrypt from "bcrypt";
import { NotificationService } from "./NotificationService.js";
import {
  AccountType,
  ContactType,
  NotificationType,
} from "../../../../shared/utils/enums.js";
import { ResultError, pushElement } from "../../../utils/utils.js";
import { Contact as Tcontact } from "../../../../shared/model/contact.model.js";
import prisma from "../../../prisma/prisma.Client";



//#endregion

// #region Consts
// const prisma = new PrismaClient(
//   {log: ['query', 'info', 'warn', 'error']}
// );

// #endregion

// #region Interfaces
interface ISortOrder {
  fieldName?: string;
  direction: "desc" | "asc";
}
interface IFilterOptions {
  select?: string[];
  where?: Prisma.ContactWhereInput;
  orderBy?: ISortOrder[];
  take?: number;
  skip?: number;
}
// #endregion

// #region Types
type Trole = Prisma.RoleByUserUncheckedCreateWithoutUserInput;
type Tphone = Prisma.PhoneCreateManyInput
type Taddress = Prisma.AddressCreateManyInput;
type TorderBy = Prisma.ContactOrderByWithRelationInput;
type Tcompany = Prisma.CompanyCreateManyInput; //CompanyUncheckedCreateWithoutContactInput;
type Tcard = Prisma.CardUncheckedCreateWithoutContactInput;
//
// #endregion

// #region Functions
export class Contactservice implements IFilter<Contact>, ICrud<Contact> {
  applyFilter(options: any): Promise<
    {
      id: number;
      firstname: string;
      middlename: string | null;
      lastname: string;
      dob: Date | null;
      stateId: string | null;
      accountTypeId: number;
      positionTypeId: number | null;
      isActive: boolean;
      createdAt: Date;
      createdBy: string | null;
      updatedAt: Date | null;
      updatedBy: string | null;
      isDeleted: boolean | null;
    }[]
  > {
    throw new Error("Method not implemented.");
  }
  result: any;
  async delete(id: number): Promise<number> {
    try {
      this.result = await prisma.contact.delete({ where: { id: id } });
    } catch (error) {
      console.log(error);
      ResultError.TriedDeleteOne("Contact");
    }
    return this.result;
  }

  create(data: Contact): Promise<Contact> {
    try {
      this.result = prisma.contact.create({ data });
      return this.result;
    } catch (error) {
      console.log(error);
      throw new Error("An error ocurred while creatig the contact");
    }
  }
  getById(id: number): Promise<Contact> {
    try {
      this.result = prisma.contact.findUnique({
        where: { id: id },
        include: {
          User: {
            select: {
              username: true,
              RoleByUser: {
                //select: { roleId: { select: { id: true } } },
                where: { isActive: true },
              },
            },
          },
          Address: {
            select: { street: true, city: true, state: true, country: true },
            where: { isActive: true },
          },
          Phone: {
            select: { phone: true, phoneTypeId: true },
            where: { isActive: true },
          },
          Company: {
            select: { companyName: true, website: true },
            where: { isActive: true },
          },
        },
      });
      return this.result;
    } catch (error) {
      console.log(error);
      throw new Error("An error ocurred while fectching the contact");
    }
  }
  getAll(): Promise<Contact[]> {
    try {
      this.result = prisma.contact.findMany({ include: { User: true } });
      return this.result;
    } catch (error) {
      console.log(error);
      throw new Error("An error ocurred while fetching the contacts");
    }
  }
  update(data: Contact): Promise<Contact> {
    try {
      this.result = prisma.contact.findUnique({
        where: { id: data.id },
      });
    } catch (error) {
      console.log(error);
      throw new Error("An error ocurred while updating the contact");
    }
    return this.result;
  }
  async register(data:any): Promise<any> {
    debugger;
    const { contact: tcontact } = data;
    const contact: Tcontact = tcontact;
    const roles: Trole[] = [];
    const isAdditionalInfo: boolean = typeof contact.id !== "undefined";//validate if id exists already
    const user = contact.user;
    const hashPassword = bcrypt.hashSync(user.password, 10);
    try {
      
      if(isAdditionalInfo)
      return this.addAddionalInfo(contact);
      
      pushElement(roles, user.roleByUser);
      this.result = await prisma.contact.create({
        data: {
          firstname: contact.firstname,
          lastname: contact.lastname,
          User: {
            create: {
              email: user.email,
              username: user.username,
              password: hashPassword,
              RoleByUser: {
                createMany: { data: roles },
              },
            },
          },
        },
      });
    } catch (error) {
        console.log(error);
      throw new Error("An erro ocurred while trying to create the register");
    }
    // Send email notification
    const emailOptions = {
      to: user.email,
      from: "", // This will be set by the NotificationService
      subject: "", // This will be set by the NotificationService
      html: "", // This will be set by the NotificationService
      key:this.result.id, // This will be set by the NotificationService/ This will be set by the NotificationService
    };
    const callback = (error: any, info: any) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:");
      }
    };
    
    await NotificationService.sendNotification(NotificationType.Registration, emailOptions, callback);

    return this.result;
  }

  private async addAddionalInfo(contact: Tcontact): Promise<boolean>{
   this.result =false;
    const phones: Tphone[] = [];
    const addresses: Taddress[] = [];
    const cards: Tcard[] = [];
    const companies: Tcompany[] = [];
    pushElement(phones, contact.phone);
    pushElement(addresses, contact.address);
    pushElement(cards, contact.user.cards);
    pushElement(companies, contact.company);
    try {
        await prisma.$transaction([
        prisma.phone.createMany({ data: phones }),
        prisma.address.createMany({ data: addresses }),
      ])
    this.result = true;
    } catch (error: any) {
      this.result= false;
      console.log(error.message);
      throw new Error("An erro ocurred while trying to add additional information");
    }
    return this.result;
  }
  // applyFilter(options: IFilterOptions): Promise<Contact> {
  //   try {
  //     const { select, where, orderBy, take, skip } = options;
  //     const orderby: TorderBy[] = [{}];

  //     for (const item of orderBy) {
  //       switch (item.fieldName) {
  //         case "firstname":
  //           orderby.push({ firstname: item.direction });
  //           break;
  //         case "lastname":
  //           orderby.push({ lastname: item.direction });
  //         //case "address":
  //         default:
  //           orderby.push({ firstname: item.direction });
  //           break;
  //       }
  //     }

  //     const contacts = prisma.contact.findMany({
  //       select: {
  //         ...(select && {
  //           ...select.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
  //         }),
  //       },
  //       where: {
  //         ...(where && { ...where }),
  //       },
  //       orderBy: orderby,
  //       skip: skip ?? undefined,
  //       take: take ?? undefined,
  //     });
  //     return contacts;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("An error ocurred while filtering the contact(s)");
  //   }
  // }
}
export default Contactservice;

// #endregion
