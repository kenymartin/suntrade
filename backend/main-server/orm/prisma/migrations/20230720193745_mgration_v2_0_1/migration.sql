/*
  Warnings:

  - You are about to drop the column `addressId` on the `AddresType` table. All the data in the column will be lost.
  - Added the required column `addresTypeId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AddresType" DROP CONSTRAINT "AddresType_addressId_fkey";

-- DropIndex
DROP INDEX "AddresType_addressId_key";

-- AlterTable
ALTER TABLE "AddresType" DROP COLUMN "addressId";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "addresTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_addresTypeId_fkey" FOREIGN KEY ("addresTypeId") REFERENCES "AddresType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
