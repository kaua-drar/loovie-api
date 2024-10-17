/*
  Warnings:

  - You are about to drop the column `language_id` on the `GenreTranslation` table. All the data in the column will be lost.
  - You are about to drop the column `language_id` on the `ProductionTranslation` table. All the data in the column will be lost.
  - You are about to drop the column `language_id` on the `SeasonTranslation` table. All the data in the column will be lost.
  - You are about to drop the column `language_id` on the `SubGenreTranslation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[genre_id,language_code]` on the table `GenreTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[season_id,language_code]` on the table `SeasonTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sub_genre_id,language_code]` on the table `SubGenreTranslation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `language_code` to the `GenreTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language_code` to the `ProductionTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language_code` to the `SeasonTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language_code` to the `SubGenreTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GenreTranslation" DROP CONSTRAINT "GenreTranslation_language_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductionTranslation" DROP CONSTRAINT "ProductionTranslation_language_id_fkey";

-- DropForeignKey
ALTER TABLE "SeasonTranslation" DROP CONSTRAINT "SeasonTranslation_language_id_fkey";

-- DropForeignKey
ALTER TABLE "SubGenreTranslation" DROP CONSTRAINT "SubGenreTranslation_language_id_fkey";

-- DropIndex
DROP INDEX "GenreTranslation_genre_id_language_id_key";

-- DropIndex
DROP INDEX "SeasonTranslation_season_id_language_id_key";

-- DropIndex
DROP INDEX "SubGenreTranslation_sub_genre_id_language_id_key";

-- AlterTable
ALTER TABLE "GenreTranslation" DROP COLUMN "language_id",
ADD COLUMN     "language_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductionTranslation" DROP COLUMN "language_id",
ADD COLUMN     "language_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SeasonTranslation" DROP COLUMN "language_id",
ADD COLUMN     "language_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubGenreTranslation" DROP COLUMN "language_id",
ADD COLUMN     "language_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GenreTranslation_genre_id_language_code_key" ON "GenreTranslation"("genre_id", "language_code");

-- CreateIndex
CREATE UNIQUE INDEX "SeasonTranslation_season_id_language_code_key" ON "SeasonTranslation"("season_id", "language_code");

-- CreateIndex
CREATE UNIQUE INDEX "SubGenreTranslation_sub_genre_id_language_code_key" ON "SubGenreTranslation"("sub_genre_id", "language_code");

-- AddForeignKey
ALTER TABLE "ProductionTranslation" ADD CONSTRAINT "ProductionTranslation_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Language"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTranslation" ADD CONSTRAINT "SeasonTranslation_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Language"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubGenreTranslation" ADD CONSTRAINT "SubGenreTranslation_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Language"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreTranslation" ADD CONSTRAINT "GenreTranslation_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Language"("code") ON DELETE CASCADE ON UPDATE CASCADE;
