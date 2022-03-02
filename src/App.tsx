import { useEffect, useState } from "react";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import "./styles/global.scss";

import "./styles/sidebar.scss";
import "./styles/content.scss";
import "./styles/skeleton.scss";

interface Genre {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

export function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  function handleClickButton(genre: Genre) {
    setSelectedGenre(genre);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        selectedGenreId={selectedGenre.id}
        onHandlerClick={handleClickButton}
      />

      <Content selectedGenre={selectedGenre} />
    </div>
  );
}
