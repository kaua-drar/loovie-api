/*
  Warnings:

  - You are about to drop the column `name` on the `SubGenre` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "GenreTranslation_genre_id_key";

-- DropIndex
DROP INDEX "GenreTranslation_language_code_key";

-- DropIndex
DROP INDEX "SubGenre_name_key";

-- DropIndex
DROP INDEX "SubGenreTranslation_language_code_key";

-- DropIndex
DROP INDEX "SubGenreTranslation_sub_genre_id_key";

-- AlterTable
ALTER TABLE "SubGenre" DROP COLUMN "name";
