/*
  Warnings:

  - The values [Episode] on the enum `TitleType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `aired_at` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `backdrop_path` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `release_date` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `backdrop_path` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Title` table. All the data in the column will be lost.
  - You are about to drop the column `originalTitle` on the `Title` table. All the data in the column will be lost.
  - You are about to drop the column `original_language` on the `Title` table. All the data in the column will be lost.
  - You are about to drop the column `tmdb_id` on the `Title` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Title` table. All the data in the column will be lost.
  - You are about to drop the `SubGenreGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TitleCast` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TitleTranslation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adult` to the `Title` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductionType" AS ENUM ('Title', 'Episode');

-- AlterEnum
BEGIN;
CREATE TYPE "TitleType_new" AS ENUM ('Movie', 'Show');
ALTER TABLE "Title" ALTER COLUMN "titleType" TYPE "TitleType_new" USING ("titleType"::text::"TitleType_new");
ALTER TYPE "TitleType" RENAME TO "TitleType_old";
ALTER TYPE "TitleType_new" RENAME TO "TitleType";
DROP TYPE "TitleType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "SubGenreGenre" DROP CONSTRAINT "SubGenreGenre_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "SubGenreGenre" DROP CONSTRAINT "SubGenreGenre_subGenre_id_fkey";

-- DropForeignKey
ALTER TABLE "TitleCast" DROP CONSTRAINT "TitleCast_person_id_fkey";

-- DropForeignKey
ALTER TABLE "TitleCast" DROP CONSTRAINT "TitleCast_title_id_fkey";

-- DropForeignKey
ALTER TABLE "TitleTranslation" DROP CONSTRAINT "TitleTranslation_language_id_fkey";

-- DropForeignKey
ALTER TABLE "TitleTranslation" DROP CONSTRAINT "TitleTranslation_title_id_fkey";

-- DropIndex
DROP INDEX "Title_tmdb_id_key";

-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "aired_at",
DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "backdrop_path",
DROP COLUMN "release_date";

-- AlterTable
ALTER TABLE "Show" DROP COLUMN "backdrop_path";

-- AlterTable
ALTER TABLE "Title" DROP COLUMN "created_at",
DROP COLUMN "originalTitle",
DROP COLUMN "original_language",
DROP COLUMN "tmdb_id",
DROP COLUMN "updated_at",
ADD COLUMN     "adult" BOOLEAN NOT NULL,
ADD COLUMN     "backdrop_path" TEXT,
ADD COLUMN     "popularity" DOUBLE PRECISION;

-- DropTable
DROP TABLE "SubGenreGenre";

-- DropTable
DROP TABLE "TitleCast";

-- DropTable
DROP TABLE "TitleTranslation";

-- CreateTable
CREATE TABLE "Production" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tmdb_id" TEXT NOT NULL,
    "originalTitle" TEXT NOT NULL,
    "original_language" TEXT NOT NULL,
    "release_date" TIMESTAMP(3),
    "vote_average" DOUBLE PRECISION,
    "vote_count" INTEGER,
    "productionType" "ProductionType" NOT NULL,

    CONSTRAINT "Production_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionTranslation" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "overview" TEXT,
    "poster_path" TEXT,
    "language_id" TEXT NOT NULL,
    "production_id" TEXT NOT NULL,

    CONSTRAINT "ProductionTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionTeam" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "cast_production_id" TEXT NOT NULL,
    "crew_production_id" TEXT NOT NULL,

    CONSTRAINT "ProductionTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionMember" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "production_team_id" TEXT NOT NULL,

    CONSTRAINT "ProductionMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SubGenreGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Production_tmdb_id_key" ON "Production"("tmdb_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionTeam_cast_production_id_key" ON "ProductionTeam"("cast_production_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionTeam_crew_production_id_key" ON "ProductionTeam"("crew_production_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionMember_production_team_id_person_id_key" ON "ProductionMember"("production_team_id", "person_id");

-- CreateIndex
CREATE UNIQUE INDEX "_SubGenreGenre_AB_unique" ON "_SubGenreGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_SubGenreGenre_B_index" ON "_SubGenreGenre"("B");

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_id_fkey" FOREIGN KEY ("id") REFERENCES "Production"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionTranslation" ADD CONSTRAINT "ProductionTranslation_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionTranslation" ADD CONSTRAINT "ProductionTranslation_production_id_fkey" FOREIGN KEY ("production_id") REFERENCES "Production"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_id_fkey" FOREIGN KEY ("id") REFERENCES "Production"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionTeam" ADD CONSTRAINT "ProductionTeam_cast_production_id_fkey" FOREIGN KEY ("cast_production_id") REFERENCES "Production"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionTeam" ADD CONSTRAINT "ProductionTeam_crew_production_id_fkey" FOREIGN KEY ("crew_production_id") REFERENCES "Production"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionMember" ADD CONSTRAINT "ProductionMember_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionMember" ADD CONSTRAINT "ProductionMember_production_team_id_fkey" FOREIGN KEY ("production_team_id") REFERENCES "ProductionTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubGenreGenre" ADD CONSTRAINT "_SubGenreGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubGenreGenre" ADD CONSTRAINT "_SubGenreGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "SubGenre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
