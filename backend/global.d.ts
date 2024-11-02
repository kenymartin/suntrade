import { PrismaClient } from '@prisma/client';
import {crypto} from 'crypto';
declare global {
    namespace NodeJS {
      interface Global {
        prisma: PrismaClient;
        crypto: Crypto;
      }
    }
  }
 export default global
  // This file must be imported in every file where you want to use the global variable