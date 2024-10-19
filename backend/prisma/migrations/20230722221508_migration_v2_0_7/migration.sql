/*
  Warnings:

  - You are about to drop the column `addresTypeId` on the `Address` table. All the data in the column will be lost.
  - Added the required column `addressTypeId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_addresTypeId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "addresTypeId",
ADD COLUMN     "addressTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_addressTypeId_fkey" FOREIGN KEY ("addressTypeId") REFERENCES "AddresType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
