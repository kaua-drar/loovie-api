class TmdbService
  def initialize
    @tmdb_api = RestClient::Resource.new("https://api.themoviedb.org/3", headers: {
      accept: "application/json",
      authorization: "Bearer #{ENV['TMDB_API_KEY']}"
    })
  end

  def discover_movies
    language = Language.find_or_create_by(code: "pt-BR", name: "Português (Brasil)")

    response = @tmdb_api["/discover/movie?&language=#{language.code}"].get

    tmdb_movies = JSON.parse(response.body)["results"]

    tmdb_movies.each do |tmdb_movie|
      tmdb_id = tmdb_movie["id"]

      return if Movie.exists?(tmdb_id: tmdb_id)

      movie = Movie.create(
        tmdb_id:,
        original_name: tmdb_movie["original_title"],
        original_language: tmdb_movie["original_language"],
        backdrop_path: tmdb_movie["backdrop_path"],
        release_date: Date.parse(tmdb_movie["release_date"]),
        vote_average: tmdb_movie["vote_average"],
        vote_count: tmdb_movie["vote_count"],
        adult: tmdb_movie["adult"],
        popularity: tmdb_movie["popularity"],
      )

      ProductionTranslation.create(
        production: movie,
        language: language,
        name: tmdb_movie["title"],
        poster_path: tmdb_movie["poster_path"],
        overview: tmdb_movie["overview"],
      )
    end
  end

  def get_all_genres
    language = Language.find_or_create_by(code: "pt-BR", name: "Português (Brasil)")
    puts "language: #{language}"

    tmdb_movies_genres_response = @tmdb_api["/genre/movie/list?language=#{language.code}"].get

    tmdb_movies_genres = JSON.parse(tmdb_movies_genres_response.body)["genres"]

    tmdb_shows_genres_response = @tmdb_api["/genre/tv/list?language=#{language.code}"].get

    tmdb_shows_genres = JSON.parse(tmdb_shows_genres_response.body)["genres"]

    all_genres = tmdb_movies_genres + tmdb_shows_genres

    all_genres.each do |tmdb_genre|
      next if Genre.exists?(tmdb_id: tmdb_genre["id"])

      genre = Genre.create(tmdb_id: tmdb_genre["id"])

      GenreTranslation.create(
        genre: genre,
        language: language,
        name: tmdb_genre["name"],
      )
    end
  end
end
