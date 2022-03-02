import { useState, useEffect } from "react";
import { api } from "../services/api";

import { Button } from "../components/Button";

interface GenresProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface SideBarProps {
  selectedGenreId: number;
  onHandlerClick: (id: GenresProps) => void;
}

export function SideBar({ selectedGenreId, onHandlerClick }: SideBarProps) {
  const [genres, setGenres] = useState<GenresProps[]>([]);

  useEffect(() => {
    api.get<GenresProps[]>("genres").then((response) => {
      setGenres(response.data);
      onHandlerClick(response.data[selectedGenreId] ?? response.data[0]);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={genre.id.toString()}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onHandlerClick(genre)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
