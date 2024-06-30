// #region Imports
import { PrismaClient, Contact, Prisma } from "@prisma/client";
import ICrud from "./interfaces/ICrud.js";
import IFilter from "./interfaces/IFilter.js";
import { GetResult } from "@prisma/client/runtime/library.js";
import bcrypt from "bcrypt";
import { NotificationService } from "./NotificationService.js";
import { ContactType, NotificationType } from "../shared/utils/enums.js";
import { ResultError,pushElement } from "../shared/utils/utils.js";

//#endregion

// #region Consts
const prisma = new PrismaClient();

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
type Tphone = Prisma.PhoneUncheckedCreateWithoutContactInput;
type Taddress = Prisma.AddressUncheckedCreateWithoutContactInput;
type TorderBy = Prisma.ContactOrderByWithRelationInput;
type Tcompany = Prisma.CompanyUncheckedCreateWithoutContactInput;
// #endregion

// #region Functions
export class Contactservice implements IFilter<Contact>, ICrud<Contact> {
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
  
  create( data:Contact) : Promise< Contact> {
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
              roleByUser: {
                select: { role: { select: { id: true } } },
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
  update( data:Contact): Promise<Contact> {
    try {
      if (typeof data.dob !== "undefined") {
        data.dob = new Date(data.dob);
      }
      this.result = prisma.contact.update({ where: { id: data.id }, data });
      return this.result;
    } catch (error) {
      console.log(error);
      throw new Error("An error ocurred while updating the contact");
    }
  }
  register(data: any): Promise<Contact> {
    debugger
    try {
      const { contact } = data;
      const user = contact.user;
      const roles: Trole[] = [];
      const phones: Tphone[] = [];
      const address: Taddress[] = [];
      const companies: Tcompany[] = [];
      const hashPassword = bcrypt.hashSync(user.password, 10);
      
      pushElement(roles, user.roles);
      pushElement(phones, contact.phone);
      pushElement(address, contact.address);
      
     if(contact.contactTypeId === ContactType.Business){
        pushElement<Tcompany>(companies, contact.company);
     }

      this.result = prisma.contact.create({
        data: {
          firstname: contact.firstname,
          lastname: contact.lastname,
          dob: contact.dob,
          stateId: contact.stateId,
          User: {
            create: {
              email: user.email,
              username: user.username,
              password: hashPassword,
              roleByUser: {
                createMany: { data: roles },
              },
            },
          },
          Address: {
            createMany: { data: address },
          },
          Phone: {
            createMany: { data: phones },
          },
          Company: {
            createMany: { data: companies },
          },
        },
      });
      const options = {
        to: user.email,
      };
      
        NotificationService.Send( NotificationType.Resistration,
        options,
        (error: any, info: any) => {
          if (error) {
            console.log("Error:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        }
      );
      
      return this.result;
    } catch (error) {
      console.log(error);
      throw new Error("An erro ocurred while trying to create the register");
    }
  }

  applyFilter(options: IFilterOptions): Promise<
    (GetResult<
      {
        id: number;
        firstname: string;
        lastname: string;
        dob: Date;
        address: string;
        scalars: any;
        objects: any;
        composites: any;
      },
      any
    > &
      any)[]
  > {
    try {
      const { select, where, orderBy, take, skip } = options;
      const orderby: TorderBy[] = [{}];

      for (const item of orderBy) {
        switch (item.fieldName) {
          case "firstname":
            orderby.push({ firstname: item.direction });
            break;
          case "lastname":
            orderby.push({ lastname: item.direction });
          //case "address":
          default:
            orderby.push({ firstname: item.direction });
            break;
        }
      }

      const contacts = prisma.contact.findMany({
        select: {
          ...(select && {
            ...select.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
          }),
        },
        where: {
          ...(where && { ...where }),
        },
        orderBy: orderby,
        skip: skip ?? undefined,
        take: take ?? undefined,
      });
      return contacts;
    } catch (error) {
      console.log(error);
      throw new Error("An error ocurred while filtering the contact(s)");
    }
  }

  
}
export default Contactservice;

// #endregion
