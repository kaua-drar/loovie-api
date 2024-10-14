/*
  Warnings:

  - A unique constraint covering the columns `[tmdb_id]` on the table `Media` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Media_tmdb_id_key" ON "Media"("tmdb_id");
