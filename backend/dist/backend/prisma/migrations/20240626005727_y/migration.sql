/*
  Warnings:

  - You are about to drop the column `contactTypeId` on the `Contact` table. All the data in the column will be lost.
  - The primary key for the `ProductPrice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `discount` on the `ProductPrice` table. All the data in the column will be lost.
  - You are about to drop the column `finalPrice` on the `ProductPrice` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `ProductPrice` table. All the data in the column will be lost.
  - You are about to drop the column `originalprice` on the `ProductPrice` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `ProductPrice` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductPrice` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `ProductPrice` table. All the data in the column will be lost.
  - The `id` column on the `ProductPrice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `price` to the `ProductPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ProductPrice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_productPriceId_fkey";

-- DropForeignKey
ALTER TABLE "SolarPanel" DROP CONSTRAINT "SolarPanel_productPriceId_fkey";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "contactTypeId",
ADD COLUMN     "accountTypeId" INTEGER NOT NULL DEFAULT 200,
ALTER COLUMN "positionTypeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductPrice" DROP CONSTRAINT "ProductPrice_pkey",
DROP COLUMN "discount",
DROP COLUMN "finalPrice",
DROP COLUMN "isDeleted",
DROP COLUMN "originalprice",
DROP COLUMN "tax",
DROP COLUMN "updatedAt",
DROP COLUMN "updatedBy",
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductPrice_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "SKU" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "ProductPriceId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductRating" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "ProductRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductView" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "ProductView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductReview" (
    "id" SERIAL NOT NULL,
    "review" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "categoryId" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_SKU_key" ON "Product"("SKU");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRating" ADD CONSTRAINT "ProductRating_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrice" ADD CONSTRAINT "ProductPrice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductView" ADD CONSTRAINT "ProductView_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
