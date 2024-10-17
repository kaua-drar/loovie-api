/*
  Warnings:

  - A unique constraint covering the columns `[tmdb_id]` on the table `Title` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Title_tmdb_id_key" ON "Title"("tmdb_id");
