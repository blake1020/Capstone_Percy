import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterPage from "./components/CharacterPage";
import CharacterCard from "./components/CharacterCard";
import Navbar from "./app/Navbar";
import BookReviewPage from "./components/BookReviewPage";
import MythicalCreaturePage from "./components/MythicalCreaturePage";
import HomePage from "./components/HomePage";
import CharacterCarousel from "./components/CharacterCarousel";
import axios from "axios";
import "../src/css/App.css";

//import book covers

const bookList = [
  { id: "1", title: "The Lightning Thief" },
  { id: "2", title: "The Sea of Monsters" },
  { id: "3", title: "The Titan's Curse" },
];

function App() {
  const [selectedBook, setSelectedBook] = useState("");
  const [characters, setCharacters] = useState([]);
  const [mythicalCreatures, setMythicalCreatures] = useState([]);
  const [selectedReviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
  };

  //grab mythical creatures
  useEffect(() => {
    const fecthMythicalCretures = async () => {
      const res = await axios.get("http://localhost:3002/mythicals");
    };
  });
  useEffect(() => {
    console.log(selectedBook);
  }, [selectedBook]);

  //grab characters from database
  useEffect(() => {
    const fetchCharacters = async () => {
      //fetch reviews
      try {
        const res = await axios.get("http://localhost:3002/characters");

        setCharacters(res.data);

        console.log("fetched characters:", res.data);
      } catch (error) {
        console.error("Error getting character data");
      } //set to state
    };
    fetchCharacters();
  }, []);

  console.log("Characters in App", characters);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="app-container">
      <Router>
        <Navbar selectedBook={selectedBook} onBookChange={handleBookChange} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/characters"
            element={<CharacterPage characters={characters} />}
          />
          <Route
            path="/bookReviews"
            element={<BookReviewPage selectedBook={selectedBook} />}
          />
          <Route path="/mythicalCreatures" element={<MythicalCreaturePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
