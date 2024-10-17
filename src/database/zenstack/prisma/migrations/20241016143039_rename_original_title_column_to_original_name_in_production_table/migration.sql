/*
  Warnings:

  - You are about to drop the column `originalTitle` on the `Production` table. All the data in the column will be lost.
  - Added the required column `original_name` to the `Production` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Production" DROP COLUMN "originalTitle",
ADD COLUMN     "original_name" TEXT NOT NULL;
