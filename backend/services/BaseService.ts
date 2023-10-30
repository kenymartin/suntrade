import { PrismaClient, Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library.js'
import Singleton from './singleton/Singleton.js'
/**
 * Class representing the base class
 */
export class BaseService extends Singleton {
    public readonly  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
   constructor() {
    super();
    this.prisma = new PrismaClient();
    this.connect();
    //this.disconnect();
   }
}
export default BaseService

