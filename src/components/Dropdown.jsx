import React from "react";
import "../css/Dropdown.css";

function DropDown({ bookList, selectedBook, onBookChange }) {
  return (
    <div className="dropdown">
      <label htmlFor="bookSelect">Select a Book: </label>
      <select id="bookSelect" value={selectedBook} onChange={onBookChange}>
        <option value="">Select a book</option>
        {bookList.map((book) => (
          <option key={book.id} value={book.id}>
            {book.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDown;
