import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3002";
const ratings = ["Fantastic", "Great", "Okay", "Bad", "Terrible"];

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [reviewContent, setReviewContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [userRating, setUserRating] = useState("Fantastic");
  const [isEditing, setIsEditing] = useState(false);
  const [editReviewContent, setEditReviewContent] = useState("");
  const [editReviewId, setEditReviewId] = useState("");

  //grab all reviews
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/reviews`);
        setReviews(response.data);
        console.log("Reviews array:", response.data);
      } catch (error) {
        console.error("Error fetching review list", error);
        setError("Failed to load Review");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    if (userName && reviewContent) {
      const createReview = {
        reviewerName: userName,
        ratings: userRating,
        content: reviewContent,
      };
      try {
        const response = await axios.post(
          `${API_URL}/reviews/reviews`,
          createReview
        );
        setReviews((prevReviews) => [response.data, ...prevReviews]);

        console.log("Previous Reviews", prevReviews);

        // setReviews((reviews) => {
        //   [...reviews, response.data];
        // });

        setUsername("");
        setUserRating("Fantastic");
        setReviewContent("");
      } catch (error) {
        console.error("Error submitting review", error);
        // alert("Failed to submit the review. Please try again");
      }
    } else {
      alert("Please enter your name and review content.");
    }
  };
  //handles sumbiting review
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleRatingChange = (event) => {
    setUserRating(event.target.value);
  };
  const handleReviewContentChange = (event) => {
    setReviewContent(event.target.value);
  };

  const handleDelete = async (reviewId) => {
    try {
      console.log(`Attempting to delete review with ID: ${reviewId}`);

      await axios.delete(`${API_URL}/reviews/${reviewId}`);

      console.log(`Review ${reviewId} deleted successfully.`);

      setReviews(reviews.filter((review) => review._id !== reviewId));
      setError(null);
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
      setIsEditing(false);

      const response = await axios.get(`${API_URL}/reviews`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditReviewContent("");
  };

  return (
    <div>
      <form onSubmit={handleSubmitReview}>
        <div>
          <label htmlFor="username">Enter your name: </label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={handleUserNameChange}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="ratings">Ratings: </label>
          <select id="ratings" value={userRating} onChange={handleRatingChange}>
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

      {/* Displaying the Reviews */}
      <div>
        <h2>Reviews</h2>
        {reviews && reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <strong>{review.reviewerName}</strong>
                <br /> ({review.ratings}) <p>{review.content}</p>
                <button onClick={() => handleEdit(review.id, review.content)}>
                  Edit
                </button>
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => handleDelete(review._id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default Reviews;
