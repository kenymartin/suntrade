import { PrismaClient, Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library.js'
import Singleton from './singleton/Singleton.js'
/**
 * Class representing the base class
 */
export class BaseService extends Singleton {
    /**
     * Prisma client
     */
    prisma: PrismaClient
    /**
     * Prisma client
     */
    constructor() {
        super()
        this.prisma = new PrismaClient()
    }
    /**
     * Prisma client
     */
    get prismaClient2(): PrismaClient {
        return this.prisma
    }
    /**
     * Prisma client
     */
   
}
export default BaseService

