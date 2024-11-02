/*
  Warnings:

  - The `contactId` column on the `Card` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `contactId` column on the `Cart` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Contact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Contact` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `contactId` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contactId` on the `Company` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contactId` on the `Email` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contactId` on the `Phone` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contactId` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_contactId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_contactId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "contactId",
ADD COLUMN     "contactId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "contactId",
ADD COLUMN     "contactId" INTEGER;

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "contactId",
ADD COLUMN     "contactId" INTEGER;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "contactId",
ADD COLUMN     "contactId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Contact_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Email" DROP COLUMN "contactId",
ADD COLUMN     "contactId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Phone" DROP COLUMN "contactId",
ADD COLUMN     "contactId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "contactId",
ADD COLUMN     "contactId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_contactId_key" ON "Company"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Email_contactId_key" ON "Email"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "User_contactId_key" ON "User"("contactId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
