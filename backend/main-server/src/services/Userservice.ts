// import { PrismaClient,User } from "@prisma/client/generator-build/index.js";
import IReadable from "./interfaces/IReadable";
import IFilter from "./interfaces/IFilter";
import bcrypt from "bcrypt";
import { ResultError } from "../../../../backend/utils/utils";
import { PrismaClient, User } from "@prisma/client";
import moment from "moment";
import { ProjectError } from "../../../../shared/utils/utils";
import {
  AccountActivationError,
  NotificationType,
} from "../../../../shared/utils/enums";
import { NotificationService as notication } from "./NotificationService";
import prisma from "../../../prisma/prisma.Client";

export class UserService implements IReadable<User>, IFilter<User> {
  applyFilter(options: any): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  result: any | undefined;
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
  getById(id: string): Promise<User> {
    try {
      this.result = prisma.user.findUnique({
        where: { id: id, isActive: true },
        select: {
          username: true,
          password: true,
          id: true,
          RoleByUser: { select: { roleId: true } },
          Contact: {
            select: {
              firstname: true,
              lastname: true,
              middlename: true,
              dob: true,
              stateId: true,
              Email: true,
              Phone: true,
              Address: true,
            },
          },
        },
      });
    } catch (error) {}
    return this.result;
  }
  getAll(): Promise<User[]> {
    try {
      this.result = prisma.user.findMany({
        where: { isActive: true },
        select: {
          username: true,
          id: true,
          RoleByUser: true,
          Contact: {
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
    } catch (error) {}
    return this.result;
  }
  update(data: User): Promise<User> {
    try {
      this.result = prisma.user.update({ where: { id: data.id }, data });
    } catch (error) {
      console.log(error);
    }
    return this.result;
  }
  async ActiveUser(
    id: number,
    isReactivation: boolean = false
  ): Promise<User | ProjectError> {
    debugger;
    const now = moment().toDate();
    const twentyFourHoursAgo = moment().subtract(24, "hours").toDate();

    try {
      const user = await prisma.user.findUnique({
        where: { contactId: id },
      });

      if (!user) {
        return new ProjectError("User not found.");
      }

      if (user.isActive) {
        return new ProjectError("User is already active.");
      }

      const isWithinActivationWindow = moment(user.createdAt).isBetween(
        twentyFourHoursAgo,
        now
      );

      const isExpired = !isWithinActivationWindow;

      if (!isExpired || (isExpired && isReactivation)) {
        const updatedUser = await prisma.user.update({
          where: { contactId: id },
          data: { isActive: true, updatedAt: now },
        });

        return updatedUser;
      }

      return new ProjectError(
        "Activation link has expired.The acount cannot be activated after 24 hours",
        {
          data: AccountActivationError.EL,
        }
      );
    } catch (error: any) {
      return new ProjectError(error.message);
    }
  }
  async ReactivateUser(id: number): Promise<User | ProjectError> {
    debugger;
    try {
      const now = moment().toDate();
      const user = await prisma.user.findUnique({
        where: { contactId: id },
      });

      if (!user) {
        return new ProjectError("User not found.");
      }

      if (user.isActive) {
        return new ProjectError("User is already active.");
      }

      const updateUser = await prisma.user.update({
        where: {
          contactId: id,
        },
        data: {
          isActive: true,
          updatedAt: now,
        },
      });
      return updateUser;
    } catch (error: any) {
      return new ProjectError(error.message);
    }
  }
  async ForgotPasswordLink(email: string): Promise<boolean | ProjectError> {
      debugger
    let result: boolean | ProjectError = false;
    try {
      result = await this.ResendLink(email, NotificationType.ChangePassword);
    } catch (error) {
      return new ProjectError("Could not reset password link");
    }
    return result;
  }
  private async ResendLink(
    key: string | number,
    notificationtype: NotificationType
  ): Promise<boolean | ProjectError> {
    let user: any;
    try {
      if (typeof key === "string") {
        user = await prisma.user.findUnique({
          where: { email: key },
          select: { contactId: true, email: true },
        });
        if (!user) {
          return new ProjectError("User not found.");
        }
      }
      if (typeof key === "number") {
        user = await prisma.user.findUnique({
          where: { contactId: key },
          select: { contactId: true, email: true },
        });
        if (!user) {
          return new ProjectError("User not found.");
        }
      }
      const emailOptions = {
        to: user?.email,
        from: "", // This will be set by the NotificationService
        subject: "", // This will be set by the NotificationService
        html: "", // This will be set by the NotificationService
        key: user?.contactId, // This will be set by the NotificationService/ This will be set by the NotificationService
        app:{ page:'forgot-password'}
      };
      const callback = (error: any, info: any) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent successfully:");
        }
      };

      return new Promise<boolean>((resolve) => {
        resolve(
          notication.sendNotification(notificationtype, emailOptions, callback)
        );
      });
    } catch (error) {
      return new Promise<boolean>((resolve, reject) => {
        reject(error);
      });
    }
  }
  async ResendActivationLink(id: number): Promise<boolean> {
    debugger;
    try {
      const user = await prisma.user.findUnique({
        where: { contactId: id },
        select: { email: true, contactId: true },
      });
      const emailOptions = {
        to: user?.email,
        from: "", // This will be set by the NotificationService
        subject: "", // This will be set by the NotificationService
        html: "", // This will be set by the NotificationService
        key: user?.contactId, // This will be set by the NotificationService/ This will be set by the NotificationService
      };
      const callback = (error: any, info: any) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent successfully:");
        }
      };

      return new Promise<boolean>((resolve) => {
        resolve(
          notication.sendNotification(
            NotificationType.Reactivation,
            emailOptions,
            callback
          )
        );
      });
    } catch (error) {
      return new Promise<boolean>((_,reject) => {
        reject(error);
      });
    }
  }
  async ChangePassword(id:number, password: string):Promise<boolean|ProjectError> {
    debugger;
    let result: any
    try {
      const hashPassword = bcrypt.hashSync(password, 10);
      result = await prisma.user.update({where:{contactId:id,isActive: true}, data: {password: hashPassword}});
      return result;
    } catch (error) {
      return new Promise<boolean>((resolve, reject) => {
        reject(error);
      });
    }
  }

  // applyFilter(
  //   options: any
  // ): Promise<
  //   (GetResult<
  //     {
  //       id: number;
  //       contactId: number;
  //       username: string;
  //       email: string;
  //       password: string;
  //       isActive: boolean;
  //       createdAt: Date;
  //       createdBy: number;
  //       updatedAt: Date;
  //       updatedBy: number;
  //       isDeleted: boolean;
  //       scalars: any;
  //       objects: any;
  //       composites: any;
  //     },
  //     any
  //   > & {})[]
  // > {
  //   try {
  //     const { selec, where, orderBy, take, skip } = options;
  //     return null;
  //   } catch (error) {}
  // }
  getByUsername(username: string, password?: string): Promise<User> {
    debugger;
    try {
      this.result = prisma.user.findUnique({
        where: { username: username, password: password, isActive: true },
        select: {
          username: true,
          password: true,
          id: true,
          Contact: {
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
        },
      });
    } catch (error) {
      console.log(error);
    }
    return this.result;
  }
  getByEmail(email: string): Promise<User> {
    try {
      this.result = prisma.user.findUnique({
        where: { email: email },
        select: {
          username: true,
          password: true,
          Contact: {
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
          //roleByUser: { select: { roleId: true }, where: { isActive: true } },
        },
      });
    } catch (error) {}
    return this.result;
  }

  async checkUserName(username: string): Promise<{ isTaken: boolean }> {
    this.result = null;
    try {
      this.result = await prisma.user.findUnique({
        where: { username: username },
      });
      return { isTaken: !!this.result };
    } catch (error) {
      console.error("Error checking username", error);
      throw error;
    }
  }
}

export default UserService;
