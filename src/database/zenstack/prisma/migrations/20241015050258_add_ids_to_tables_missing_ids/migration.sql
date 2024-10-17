/*
  Warnings:

  - The primary key for the `GenreTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `language_code` on the `GenreTranslation` table. All the data in the column will be lost.
  - The primary key for the `Language` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TitleCast` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TitleGenre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TitleSubGenre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TitleTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `language_code` on the `TitleTranslation` table. All the data in the column will be lost.
  - The primary key for the `SeasonTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `language_code` on the `SeasonTranslation` table. All the data in the column will be lost.
  - The primary key for the `SubGenreGenre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SubGenreTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `language_code` on the `SubGenreTranslation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[genre_id,language_id]` on the table `GenreTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title_id,person_id]` on the table `TitleCast` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title_id,genre_id]` on the table `TitleGenre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title_id,subGenre_id]` on the table `TitleSubGenre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title_id,language_id]` on the table `TitleTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[season_id,language_id]` on the table `SeasonTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[genre_id,subGenre_id]` on the table `SubGenreGenre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sub_genre_id,language_id]` on the table `SubGenreTranslation` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `GenreTranslation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `language_id` to the `GenreTranslation` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Language` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `TitleCast` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `TitleGenre` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `TitleSubGenre` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `TitleTranslation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `language_id` to the `TitleTranslation` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `SeasonTranslation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `language_id` to the `SeasonTranslation` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `SubGenreGenre` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `SubGenreTranslation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `language_id` to the `SubGenreTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GenreTranslation" DROP CONSTRAINT "GenreTranslation_language_code_fkey";

-- DropForeignKey
ALTER TABLE "TitleTranslation" DROP CONSTRAINT "TitleTranslation_language_code_fkey";

-- DropForeignKey
ALTER TABLE "SeasonTranslation" DROP CONSTRAINT "SeasonTranslation_language_code_fkey";

-- DropForeignKey
ALTER TABLE "SubGenreTranslation" DROP CONSTRAINT "SubGenreTranslation_language_code_fkey";

-- AlterTable
ALTER TABLE "GenreTranslation" DROP CONSTRAINT "GenreTranslation_pkey",
DROP COLUMN "language_code",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "language_id" TEXT NOT NULL,
ADD CONSTRAINT "GenreTranslation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Language" DROP CONSTRAINT "Language_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Language_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TitleCast" DROP CONSTRAINT "TitleCast_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "TitleCast_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TitleGenre" DROP CONSTRAINT "TitleGenre_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "TitleGenre_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TitleSubGenre" DROP CONSTRAINT "TitleSubGenre_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "TitleSubGenre_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TitleTranslation" DROP CONSTRAINT "TitleTranslation_pkey",
DROP COLUMN "language_code",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "language_id" TEXT NOT NULL,
ADD CONSTRAINT "TitleTranslation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SeasonTranslation" DROP CONSTRAINT "SeasonTranslation_pkey",
DROP COLUMN "language_code",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "language_id" TEXT NOT NULL,
ADD CONSTRAINT "SeasonTranslation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SubGenreGenre" DROP CONSTRAINT "SubGenreGenre_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SubGenreGenre_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SubGenreTranslation" DROP CONSTRAINT "SubGenreTranslation_pkey",
DROP COLUMN "language_code",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "language_id" TEXT NOT NULL,
ADD CONSTRAINT "SubGenreTranslation_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "GenreTranslation_genre_id_language_id_key" ON "GenreTranslation"("genre_id", "language_id");

-- CreateIndex
CREATE UNIQUE INDEX "Language_code_key" ON "Language"("code");

-- CreateIndex
CREATE UNIQUE INDEX "TitleCast_title_id_person_id_key" ON "TitleCast"("title_id", "person_id");

-- CreateIndex
CREATE UNIQUE INDEX "TitleGenre_title_id_genre_id_key" ON "TitleGenre"("title_id", "genre_id");

-- CreateIndex
CREATE UNIQUE INDEX "TitleSubGenre_title_id_subGenre_id_key" ON "TitleSubGenre"("title_id", "subGenre_id");

-- CreateIndex
CREATE UNIQUE INDEX "TitleTranslation_title_id_language_id_key" ON "TitleTranslation"("title_id", "language_id");

-- CreateIndex
CREATE UNIQUE INDEX "SeasonTranslation_season_id_language_id_key" ON "SeasonTranslation"("season_id", "language_id");

-- CreateIndex
CREATE UNIQUE INDEX "SubGenreGenre_genre_id_subGenre_id_key" ON "SubGenreGenre"("genre_id", "subGenre_id");

-- CreateIndex
CREATE UNIQUE INDEX "SubGenreTranslation_sub_genre_id_language_id_key" ON "SubGenreTranslation"("sub_genre_id", "language_id");

-- AddForeignKey
ALTER TABLE "SubGenreTranslation" ADD CONSTRAINT "SubGenreTranslation_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleTranslation" ADD CONSTRAINT "TitleTranslation_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTranslation" ADD CONSTRAINT "SeasonTranslation_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreTranslation" ADD CONSTRAINT "GenreTranslation_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;
