-- DropForeignKey
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_season_id_fkey";

-- DropForeignKey
ALTER TABLE "GenreTranslation" DROP CONSTRAINT "GenreTranslation_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "GenreTranslation" DROP CONSTRAINT "GenreTranslation_language_code_fkey";

-- DropForeignKey
ALTER TABLE "MediaCast" DROP CONSTRAINT "MediaCast_media_id_fkey";

-- DropForeignKey
ALTER TABLE "MediaCast" DROP CONSTRAINT "MediaCast_person_id_fkey";

-- DropForeignKey
ALTER TABLE "MediaGenre" DROP CONSTRAINT "MediaGenre_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "MediaGenre" DROP CONSTRAINT "MediaGenre_media_id_fkey";

-- DropForeignKey
ALTER TABLE "MediaSubGenre" DROP CONSTRAINT "MediaSubGenre_media_id_fkey";

-- DropForeignKey
ALTER TABLE "MediaSubGenre" DROP CONSTRAINT "MediaSubGenre_subGenre_id_fkey";

-- DropForeignKey
ALTER TABLE "MediaTranslation" DROP CONSTRAINT "MediaTranslation_language_code_fkey";

-- DropForeignKey
ALTER TABLE "MediaTranslation" DROP CONSTRAINT "MediaTranslation_media_id_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_show_id_fkey";

-- DropForeignKey
ALTER TABLE "SeasonTranslation" DROP CONSTRAINT "SeasonTranslation_language_code_fkey";

-- DropForeignKey
ALTER TABLE "SeasonTranslation" DROP CONSTRAINT "SeasonTranslation_season_id_fkey";

-- DropForeignKey
ALTER TABLE "SubGenreGenre" DROP CONSTRAINT "SubGenreGenre_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "SubGenreGenre" DROP CONSTRAINT "SubGenreGenre_subGenre_id_fkey";

-- DropForeignKey
ALTER TABLE "SubGenreTranslation" DROP CONSTRAINT "SubGenreTranslation_language_code_fkey";

-- DropForeignKey
ALTER TABLE "SubGenreTranslation" DROP CONSTRAINT "SubGenreTranslation_sub_genre_id_fkey";

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaGenre" ADD CONSTRAINT "MediaGenre_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaGenre" ADD CONSTRAINT "MediaGenre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubGenreGenre" ADD CONSTRAINT "SubGenreGenre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubGenreGenre" ADD CONSTRAINT "SubGenreGenre_subGenre_id_fkey" FOREIGN KEY ("subGenre_id") REFERENCES "SubGenre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaSubGenre" ADD CONSTRAINT "MediaSubGenre_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaSubGenre" ADD CONSTRAINT "MediaSubGenre_subGenre_id_fkey" FOREIGN KEY ("subGenre_id") REFERENCES "SubGenre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubGenreTranslation" ADD CONSTRAINT "SubGenreTranslation_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Language"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubGenreTranslation" ADD CONSTRAINT "SubGenreTranslation_sub_genre_id_fkey" FOREIGN KEY ("sub_genre_id") REFERENCES "SubGenre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaTranslation" ADD CONSTRAINT "MediaTranslation_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Language"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaTranslation" ADD CONSTRAINT "MediaTranslation_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTranslation" ADD CONSTRAINT "SeasonTranslation_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Language"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTranslation" ADD CONSTRAINT "SeasonTranslation_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreTranslation" ADD CONSTRAINT "GenreTranslation_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Language"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreTranslation" ADD CONSTRAINT "GenreTranslation_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaCast" ADD CONSTRAINT "MediaCast_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaCast" ADD CONSTRAINT "MediaCast_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
