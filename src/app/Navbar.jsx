import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";

const bookList = [
  { id: "1", title: "The Lightning Thief" },
  { id: "2", title: "The Sea of Monsters" },
  { id: "3", title: "The Titan's Curse" },
];

function Navbar({ selectedBook, onBookChange }) {
  // const location = useLocation()
  // const isBookReviewPage = location.pathname === '/bookReviews'
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/characters" className="navbar-link">
          Characters
        </Link>
        <Link to="/bookReviews" className="navbar-link">
          Book Reviews
        </Link>
        <Link to="/mythicalCreatures" className="navbar-link">
          Mythical Creatures
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
