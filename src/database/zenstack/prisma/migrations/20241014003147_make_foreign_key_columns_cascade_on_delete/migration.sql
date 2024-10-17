-- DropForeignKey
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_season_id_fkey";

-- DropForeignKey
ALTER TABLE "GenreTranslation" DROP CONSTRAINT "GenreTranslation_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "GenreTranslation" DROP CONSTRAINT "GenreTranslation_language_code_fkey";

-- DropForeignKey
ALTER TABLE "TitleCast" DROP CONSTRAINT "TitleCast_title_id_fkey";

-- DropForeignKey
ALTER TABLE "TitleCast" DROP CONSTRAINT "TitleCast_person_id_fkey";

-- DropForeignKey
ALTER TABLE "TitleGenre" DROP CONSTRAINT "TitleGenre_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "TitleGenre" DROP CONSTRAINT "TitleGenre_title_id_fkey";

-- DropForeignKey
ALTER TABLE "TitleSubGenre" DROP CONSTRAINT "TitleSubGenre_title_id_fkey";

-- DropForeignKey
ALTER TABLE "TitleSubGenre" DROP CONSTRAINT "TitleSubGenre_subGenre_id_fkey";

-- DropForeignKey
ALTER TABLE "TitleTranslation" DROP CONSTRAINT "TitleTranslation_language_code_fkey";

-- DropForeignKey
ALTER TABLE "TitleTranslation" DROP CONSTRAINT "TitleTranslation_title_id_fkey";

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
ALTER TABLE "TitleGenre" ADD CONSTRAINT "TitleGenre_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleGenre" ADD CONSTRAINT "TitleGenre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubGenreGenre" ADD CONSTRAINT "SubGenreGenre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubGenreGenre" ADD CONSTRAINT "SubGenreGenre_subGenre_id_fkey" FOREIGN KEY ("subGenre_id") REFERENCES "SubGenre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleSubGenre" ADD CONSTRAINT "TitleSubGenre_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleSubGenre" ADD CONSTRAINT "TitleSubGenre_subGenre_id_fkey" FOREIGN KEY ("subGenre_id") REFERENCES "SubGenre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubGenreTranslation" ADD CONSTRAINT "SubGenreTranslation_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Language"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubGenreTranslation" ADD CONSTRAINT "SubGenreTranslation_sub_genre_id_fkey" FOREIGN KEY ("sub_genre_id") REFERENCES "SubGenre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleTranslation" ADD CONSTRAINT "TitleTranslation_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Language"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleTranslation" ADD CONSTRAINT "TitleTranslation_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTranslation" ADD CONSTRAINT "SeasonTranslation_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Language"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonTranslation" ADD CONSTRAINT "SeasonTranslation_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreTranslation" ADD CONSTRAINT "GenreTranslation_language_code_fkey" FOREIGN KEY ("language_code") REFERENCES "Language"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreTranslation" ADD CONSTRAINT "GenreTranslation_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleCast" ADD CONSTRAINT "TitleCast_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "Title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TitleCast" ADD CONSTRAINT "TitleCast_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
