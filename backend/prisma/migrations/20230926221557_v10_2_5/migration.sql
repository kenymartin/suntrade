/*
  Warnings:

  - You are about to drop the column `companyId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Phone` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_companyId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "companyId",
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Email" DROP COLUMN "companyId";

-- AlterTable
ALTER TABLE "Phone" DROP COLUMN "companyId",
ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "SKU" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "description" TEXT,
    "quantityInStock" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(5,2),
    "categoryId" INTEGER NOT NULL,
    "supplierId" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sales" (
    "id" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "solarPanelId" INTEGER NOT NULL,
    "quantitySold" INTEGER NOT NULL DEFAULT 0,
    "unitPrice" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "discount" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "totalAmount" DECIMAL(65,30) NOT NULL DEFAULT 0.00,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_SKU_key" ON "Inventory"("SKU");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productName_key" ON "Inventory"("productName");

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_solarPanelId_fkey" FOREIGN KEY ("solarPanelId") REFERENCES "SolarPanel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
