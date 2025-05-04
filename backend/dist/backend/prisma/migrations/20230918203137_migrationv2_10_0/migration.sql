/*
  Warnings:

  - You are about to drop the column `amount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `SolarPanel` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SolarPanel` table. All the data in the column will be lost.
  - You are about to drop the `AddresType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PhoneType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[componentTypeId]` on the table `Component` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,roleId]` on the table `RoleByUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `componentTypeId` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packagingTypeId` to the `ComponentType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ComponentsBySolarPanel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toTalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `SolarPanel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `SolarPanel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `SolarPanel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_addressTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_phoneTypeId_fkey";

-- DropForeignKey
ALTER TABLE "ProductType" DROP CONSTRAINT "ProductType_productId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "companyId" INTEGER,
ADD COLUMN     "createdBy" INTEGER,
ALTER COLUMN "addressTypeId" SET DEFAULT 100;

-- AlterTable
ALTER TABLE "Component" ADD COLUMN     "componentTypeId" INTEGER NOT NULL,
ADD COLUMN     "productPriceId" INTEGER;

-- AlterTable
ALTER TABLE "ComponentType" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "packagingTypeId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedBy" INTEGER;

-- AlterTable
ALTER TABLE "ComponentsBySolarPanel" ADD COLUMN     "quantity" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "contactTypeId" INTEGER NOT NULL DEFAULT 200,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false,
ADD COLUMN     "middlename" TEXT,
ADD COLUMN     "positionTypeId" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedBy" INTEGER;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "amount",
DROP COLUMN "description",
ADD COLUMN     "orderDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "toTalPrice" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "method",
DROP COLUMN "type",
ADD COLUMN     "paymentMethodId" INTEGER NOT NULL,
ADD COLUMN     "paymentStatusId" INTEGER;

-- AlterTable
ALTER TABLE "Phone" ADD COLUMN     "companyId" INTEGER,
ALTER COLUMN "phoneTypeId" SET DEFAULT 100;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "SolarPanel" DROP COLUMN "type",
DROP COLUMN "userId",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "orderId" INTEGER,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "productPriceId" INTEGER,
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "AddresType";

-- DropTable
DROP TABLE "PhoneType";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductType";

-- DropTable
DROP TABLE "Token";

-- CreateTable
CREATE TABLE "ProductPrice" (
    "id" SERIAL NOT NULL,
    "originalprice" DECIMAL(65,30) NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL,
    "tax" DECIMAL(65,30) NOT NULL,
    "finalPrice" DECIMAL(65,30) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "ProductPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolarPanelView" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "solarPanelId" INTEGER NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SolarPanelView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolarPanelReviews" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "solarPanelId" INTEGER NOT NULL,
    "reviewDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewText" TEXT NOT NULL,

    CONSTRAINT "SolarPanelReviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolarPanelRatings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "solarPanelId" INTEGER NOT NULL,
    "retingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactId" INTEGER NOT NULL,
    "website" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "contactId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "emailTypeId" INTEGER NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "companyId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderDetails" (
    "id" SERIAL NOT NULL,
    "amountUnits" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "solarPanelId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OrderDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "solarPanelId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "contactId" INTEGER,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingInfo" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "recipientName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "shippingCarrrierName" TEXT NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ShippingInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "cardTypeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "CVV" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "contactId" INTEGER,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentStatus" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PaymentStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SolarPanelRatings_id_key" ON "SolarPanelRatings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Company_contactId_key" ON "Company"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Email_contactId_key" ON "Email"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderDetails_id_key" ON "OrderDetails"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Card_userId_key" ON "Card"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Component_componentTypeId_key" ON "Component"("componentTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "RoleByUser_userId_roleId_key" ON "RoleByUser"("userId", "roleId");

-- AddForeignKey
ALTER TABLE "SolarPanel" ADD CONSTRAINT "SolarPanel_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolarPanel" ADD CONSTRAINT "SolarPanel_productPriceId_fkey" FOREIGN KEY ("productPriceId") REFERENCES "ProductPrice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Component" ADD CONSTRAINT "Component_productPriceId_fkey" FOREIGN KEY ("productPriceId") REFERENCES "ProductPrice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolarPanelView" ADD CONSTRAINT "SolarPanelView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolarPanelView" ADD CONSTRAINT "SolarPanelView_solarPanelId_fkey" FOREIGN KEY ("solarPanelId") REFERENCES "SolarPanel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolarPanelReviews" ADD CONSTRAINT "SolarPanelReviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolarPanelReviews" ADD CONSTRAINT "SolarPanelReviews_solarPanelId_fkey" FOREIGN KEY ("solarPanelId") REFERENCES "SolarPanel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolarPanelRatings" ADD CONSTRAINT "SolarPanelRatings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolarPanelRatings" ADD CONSTRAINT "SolarPanelRatings_solarPanelId_fkey" FOREIGN KEY ("solarPanelId") REFERENCES "SolarPanel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_solarPanelId_fkey" FOREIGN KEY ("solarPanelId") REFERENCES "SolarPanel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_paymentStatusId_fkey" FOREIGN KEY ("paymentStatusId") REFERENCES "PaymentStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_solarPanelId_fkey" FOREIGN KEY ("solarPanelId") REFERENCES "SolarPanel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingInfo" ADD CONSTRAINT "ShippingInfo_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
