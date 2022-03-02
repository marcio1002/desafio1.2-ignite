import { useState, useEffect } from "react";
import { api } from "../services/api";

import { MovieCard } from "../components/MovieCard";
import { Skeleton } from "../components/Skeleton";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenresProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface ContentProps {
  selectedGenre: GenresProps;
}

export function Content({ selectedGenre }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenre.id}`)
      .then((response) => {
        setTimeout(() => {
          setMovies(response.data);
          setIsLoading(false);
        }, 500);
      });
  }, [selectedGenre]);

  return (
    <div className={`container ${isLoading ? "h-full" : ""}`}>
      {isLoading ? (
        <>
          <header>
            <Skeleton as="span" className="category" animation="grow">
              Categoria:{" "}
              <Skeleton
                as="span"
                style={{
                  display: "inline-flex",
                  width: "14%",
                  minHeight: ".6em",
                }}
              />
            </Skeleton>
          </header>

          <main>
            <div className="movies-list">
              {Array.from(Array(6)).map((m, i) => (
                <Skeleton
                  key={i}
                  animation="grow"
                  className="movie-card"
                  style={{ width: "94%" }}
                >
                  <Skeleton as="span" style={{ height: "312px" }} />
                </Skeleton>
              ))}
            </div>
          </main>
        </>
      ) : (
        <>
          <header>
            <span className="category">
              Categoria:<span> {selectedGenre.title}</span>
            </span>
          </header>

          <main>
            <div className="movies-list">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  title={movie.Title}
                  poster={movie.Poster}
                  runtime={movie.Runtime}
                  rating={movie.Ratings[0].Value}
                />
              ))}
            </div>
          </main>
        </>
      )}
    </div>
  );
}
