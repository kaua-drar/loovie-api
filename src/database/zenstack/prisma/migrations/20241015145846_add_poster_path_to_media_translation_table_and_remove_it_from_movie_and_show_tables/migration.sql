/*
  Warnings:

  - You are about to drop the column `poster_path` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `poster_path` on the `Show` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TitleTranslation" ADD COLUMN     "poster_path" TEXT;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "poster_path";

-- AlterTable
ALTER TABLE "Show" DROP COLUMN "poster_path";
