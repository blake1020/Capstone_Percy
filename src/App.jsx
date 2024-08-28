import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterPage from "./components/CharacterPage";
import CharacterCard from "./components/CharacterCard";
import Navbar from "./app/Navbar";
import BookReviewPage from "./components/BookReviewPage";
import MythicalCreaturePage from "./components/MythicalCreaturePage";
import HomePage from "./components/HomePage";
import Reviews from "./components/Reviews";
import CharacterCarousel from "./components/CharacterCarousel";
import axios from "axios";
import "../src/css/App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  //call api for book list
  const [bookList, setBookList] = useState([]);

  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
  };
  //Grab bookList for all components to pass down

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       const response = await axios.get(`${API_URL}/books`);
  //       setBookList(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching book list", error);
  //       setError("Failed to load bookList");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchBooks();
  // }, []);
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
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
