/*
  Warnings:

  - You are about to drop the column `name` on the `Genre` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Genre_name_key";

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "name",
ADD COLUMN     "tmdbId" INTEGER;
