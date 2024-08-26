import React, { useState } from "react";
import "../css/CharacterCard.css";

const CharacterCard = ({ characters }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-front">
          <h3>{characters.name}</h3>
        </div>
        <div className="card-back">
          <p>
            <strong>Godly Parent:</strong> {characters.godlyParent.join(",")}
          </p>
          <p>
            <strong>Series Appeared In:</strong>{" "}
            {characters.seriesAppearedIn.join("")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
