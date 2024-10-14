/*
  Warnings:

  - You are about to drop the column `tmdbId` on the `Genre` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tmdb_id]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "tmdbId",
ADD COLUMN     "tmdb_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Genre_tmdb_id_key" ON "Genre"("tmdb_id");
