/*
  Warnings:

  - The primary key for the `GenreTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `GenreTranslation` table. All the data in the column will be lost.
  - The primary key for the `TitleTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TitleTranslation` table. All the data in the column will be lost.
  - The primary key for the `SeasonTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SeasonTranslation` table. All the data in the column will be lost.
  - The primary key for the `SubGenreTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SubGenreTranslation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GenreTranslation" DROP CONSTRAINT "GenreTranslation_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "GenreTranslation_pkey" PRIMARY KEY ("genre_id", "language_code");

-- AlterTable
ALTER TABLE "TitleTranslation" DROP CONSTRAINT "TitleTranslation_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TitleTranslation_pkey" PRIMARY KEY ("title_id", "language_code");

-- AlterTable
ALTER TABLE "SeasonTranslation" DROP CONSTRAINT "SeasonTranslation_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "SeasonTranslation_pkey" PRIMARY KEY ("season_id", "language_code");

-- AlterTable
ALTER TABLE "SubGenreTranslation" DROP CONSTRAINT "SubGenreTranslation_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "SubGenreTranslation_pkey" PRIMARY KEY ("sub_genre_id", "language_code");
