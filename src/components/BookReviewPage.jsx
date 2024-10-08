import React, { useState, useEffect } from "react";
import DropDown from "./DropDown";
import axios from "axios";
// //import temp book covers
// import lightningThiefCover from '../src/app/assets/images/percy-jackson-lightning.jpg'
// import seaOfMonsters from '../src/app/assest/images/percy-jackson-sea-of-monsters.jpg'

// Hardcoded book reviews data til database fixed
// const reviewsData = {
//   "1": [
//     {
//       reviewerName: "John Doe",
//       rating: "Fantastic",
//       content:
//         "An exciting start to the series with a fantastic blend of action and mythology.",
//     },
//     {
//       reviewerName: "Jane Smith",
//       rating: "Great",
//       content:
//         "The character development is top-notch, making you care deeply about the protagonists.",
//     },
//   ],
//   "2": [
//     {
//       reviewerName: "Alice Brown",
//       rating: "Great",
//       content:
//         "A thrilling continuation of the story with even more intense adventures and twists.",
//     },
//     {
//       reviewerName: "Bob Johnson",
//       rating: "Okay",
//       content:
//         "The plot thickens and the stakes get higher, keeping readers on the edge of their seats.",
//     },
//   ],
//   "3": [
//     {
//       reviewerName: "Charlie Davis",
//       rating: "Fantastic",
//       content:
//         "An epic conclusion to the initial trilogy with plenty of surprises and resolutions.",
//     },
//     {
//       reviewerName: "Dana Lee",
//       rating: "Great",
//       content:
//         "This book provides many memorable moments and a satisfying end to the series.",
//     },
//   ],
// };

// Percy Jackson book titles
// const bookTitles = {
//   "1": "The Lightning Thief",
//   "2": "The Sea of Monsters",
//   "3": "The Titan's Curse",
// };

// Ratings options
const ratings = ["Fantastic", "Great", "Okay", "Bad", "Terrible"];

const API_URL = "http://localhost:3002";

function BookReviewPage() {
  const [selectedBook, setSelectedBook] = useState("");
  const [bookList, setBookList] = useState([]);
  const [selectedBookDetails, setSelectedBookDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState("");
  const [userRating, setUserRating] = useState("Fantastic");
  const [isShown, setIsShown] = useState(false);
  //NEED TO FIGURE OUT WHICH I NEED TO KEEP OR GET RID OF
  const [reviews, setReviews] = useState([]);
  const [reviewContent, setReviewContent] = useState("");

  //editing useState
  const [isEditing, setIsEditing] = useState(false);
  const [editReviewContent, setEditReviewContent] = useState("");
  const [editReviewId, setEditReviewId] = useState("");

  // Simulate fetching book list data -CONVERT TO DATA BASE
  // const bookList = [
  //   { id: "1", title: "The Lightning Thief" },
  //   { id: "2", title: "The Sea of Monsters" },
  //   { id: "3", title: "The Titan's Curse" },
  // ];

  //Book API Call
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API_URL}/books`);
        setBookList(response.data);
        console.log("Book array", response.data);
      } catch (error) {
        console.error("Error fetching book list", error);
        setError("Failed to load bookList");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (selectedBook) {
      const fetchBookDetails = async () => {
        setLoading(true);
        try {
          `${API_URL}/books/${selectedBook}`;
          const response = await axios.get(
            `${API_URL}/reviews/${selectedBook}/reviews`
          );
          setSelectedBookDetails(response.data || []);
          // Simulating fetching data from the backend
          // const bookReviews = reviewsData[selectedBook] || [];
          setReviews(response.data.reviews || []);
          console.log(
            `Fetching details for book with ID: ${selectedBook}`,
            response.data
          );
        } catch (error) {
          setError("Failed to load reviews");
        } finally {
          setLoading(false);
        }
      };

      fetchBookDetails();
    }
  }, [selectedBook]);

  const handleBookChange = (event) => {
    const selectedBook = event.target.value;
    const bookId = bookList.find((book) => book.title === selectedBook)?._id;
    setSelectedBook(bookId || "");
  };

  //handles sumbiting review
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleRatingChange = (event) => {
    setUserRating(event.target.value);
  };
  const handleReviewContentChange = (event) => {
    setReviewContent(event.target.value);
  };
  const handleSubmitReview = async (event) => {
    event.preventDefault();
    if (username && reviewContent) {
      const createReview = {
        reviewerName: username,
        ratings: userRating,
        content: reviewContent,
      };
      try {
        await axios.post(`${API_URL}/reviews/reviews`, createReview);

        const response = await axios.get(
          `${API_URL}/reviews/${selectedBook}/reviews`
        );
        setReviews(response.data.reviews || []);

        setUsername("");
        setUserRating("Fantastic");
        setReviewContent("");
      } catch (error) {
        // console.error("Error submitting review", error);
        alert("Failed to submit the review. Please try again");
      }
    } else {
      alert("Please enter your name and review content.");
    }
  };

  //runs immediately once i pick a book to view the books and the reviews
  //delete seems to be working but is says that it failed to delete the review on the page
  const handleDelete = async (reviewId) => {
    try {
      console.log(`Attempting to delete review with ID: ${reviewId}`);

      await axios.delete(`${API_URL}/reviews/${reviewId}`);

      console.log(`Review ${reviewId} deleted successfully.`);

      const { data: book } = await axios.get(
        `${API_URL}/books/${selectedBook}`
      );
      console.log("Fetched updated book detail:", book);
      setReviews(book.reviews);
      setSelectedBookDetails(book);

      setError(null);

      // const updateReviews = book.reviews.filter((id) => id !== reviewId);

      // await axios.patch(`${API_URL}/books/${selectedBook}`, {
      //   reviews: updateReviews,
      // });
      // setSelectedBookDetails(book);
    } catch (error) {
      console.error("Error deleting review", error);
      setError("Failed to delete review");
    }
  };

  const handleEdit = (reviewId, content) => {
    setEditReviewId(reviewId);
    setEditReviewContent(content);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(`${API_URL}/reviews/${editReviewId}`, {
        content: editReviewContent,
      });
      setEditReviewId(null);
      setEditReviewContent("");
      isEditing(false);

      const response = await axios.get(
        `${API_URL}/books/${selectedBook}/reviews`
      );
      setReviews(response.data.reviews);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditReviewContent("");
  };
  // const selectedBookDetails = bookList.find(
  //   (book) => book.title === selectedBook
  // );
  // console.log(bookList);

  if (!selectedBook) {
    return (
      <div>
        {/* add dropdown component */}
        <DropDown
          bookList={bookList}
          selectedBook={selectedBook}
          onBookChange={handleBookChange}
        />
        {/* <div style={{marginTop: "50px"}}> */}
        {!selectedBook ? (
          <div>
            <h1>Select a Book to review</h1>
            {/*maybe import carousel when working for opening book reviews or random cover */}
          </div>
        ) : (
          <div>
            <h1>fix it</h1>
          </div>
        )}
      </div>
    );
  }

  //make new component for reviews
  //make route to view all reviews
  //make api call to get reviews
  //CRUD

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Dropdown component */}
      <DropDown
        bookList={bookList}
        selectedBook={selectedBook}
        onBookChange={handleBookChange}
      />
      <div style={{ marginTop: "60px" }}>
        {!selectedBook ? (
          <div>
            <h2>Book Reviews</h2>
          </div>
        ) : (
          <>
            <h1>Reviews for {selectedBookDetails?.title}</h1>
            {selectedBookDetails && (
              <img
                src={selectedBookDetails.cover}
                alt={`Cover of ${selectedBookDetails.title}`}
                style={{ width: "200px", height: "auto" }}
              />
            )}
            <form onSubmit={handleSubmitReview}>
              <div>
                <label htmlFor="username">Enter your name: </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="ratings">Ratings: </label>
                <select
                  id="ratings"
                  value={userRating}
                  onChange={handleRatingChange}
                >
                  {ratings.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="reviewContent">Your Review: </label>
                <textarea
                  id="reviewContent"
                  value={reviewContent}
                  onChange={handleReviewContentChange}
                  placeholder="Write your review here"
                />
              </div>
              <button type="submit">Submit Review</button>
            </form>
            <h2>Book Reviews</h2>
            {reviews.length > 0 ? (
              <ul>
                {reviews.map((review, index) => (
                  <li key={index}>
                    <strong>Reviewer: {review.reviewerName}</strong>
                    <br />
                    <strong>Rating: {review.rating}</strong>
                    <br />
                    <p>{review.content}</p>
                    <button
                      onClick={() => handleEdit(review.id, review.content)}
                    >
                      Edit
                    </button>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => handleDelete(review._id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews available for this book.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BookReviewPage;
