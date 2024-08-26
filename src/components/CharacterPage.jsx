import React from "react";
import CharacterCarousel from "./CharacterCarousel";

const CharacterPage = ({ characters }) => {
  console.log("Character Page", characters);
  return (
    <div className="character-page">
      <h1>Character Carousel</h1>
      <CharacterCarousel characters={characters} />
    </div>
  );
};

export default CharacterPage;
