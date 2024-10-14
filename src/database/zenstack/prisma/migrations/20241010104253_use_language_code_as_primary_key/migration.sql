/*
  Warnings:

  - You are about to drop the column `language_id` on the `GenreTranslation` table. All the data in the column will be lost.
  - The primary key for the `Language` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `language_id` on the `MediaTranslation` table. All the data in the column will be lost.
  - You are about to drop the column `language_id` on the `SeasonTranslation` table. All the data in the column will be lost.
  - You are about to drop the column `language_id` on the `SubGenreTranslation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[language_code]` on the table `GenreTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[language_code]` on the table `SubGenreTranslation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `language_code` to the `GenreTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Language` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language_code` to the `MediaTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language_code` to the `SeasonTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language_code` to the `SubGenreTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GenreTranslation" DROP CONSTRAINT "GenreTranslation_language_id_fkey";

-- DropForeignKey
ALTER TABLE "MediaTranslation" DROP CONSTRAINT "MediaTranslation_language_id_fkey";

-- DropForeignKey
ALTER TABLE "SeasonTranslation" DROP CONSTRAINT "SeasonTranslation_language_id_fkey";

-- DropForeignKey
ALTER TABLE "SubGenreTranslation" DROP CONSTRAINT "SubGenreTranslation_language_id_fkey";

-- DropIndex
DROP INDEX "GenreTranslation_language_id_key";

-- DropIndex
DROP INDEX "SubGenreTranslation_language_id_key";

-- AlterTable
ALTER TABLE "GenreTranslation" DROP COLUMN "language_id",
ADD COLUMN     "language_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Language" DROP CONSTRAINT "Language_pkey",
DROP COLUMN "id",
ADD COLUMN     "code" TEXT NOT NULL,
ADD CONSTRAINT "Language_pkey" PRIMARY KEY ("code");

-- AlterTable
ALTER TABLE "MediaTranslation" DROP COLUMN "language_id",
ADD COLUMN     "language_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "duration" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SeasonTranslation" DROP COLUMN "language_id",
ADD COLUMN     "language_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubGenreTranslation" DROP COLUMN "language_id",
ADD COLUMN     "language_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GenreTranslation_language_code_key" ON "GenreTranslation"("language_code");

-- CreateIndex
CREATE UNIQUE INDEX "SubGenreTranslation_language_code_key" ON "SubGenreTranslation"("language_code");

-- AddForeignKey
ALTER TABLE "SubGenreTranslation" ADD CONSTRAINT "SubGenreTranslation_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaTranslation" ADD CONSTRAINT "MediaTranslation_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTranslation" ADD CONSTRAINT "SeasonTranslation_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreTranslation" ADD CONSTRAINT "GenreTranslation_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
