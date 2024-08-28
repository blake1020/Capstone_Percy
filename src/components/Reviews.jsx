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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/reviews`);
        setReviews(response.data);
        console.log("Reviews array:", response.data);
      } catch (error) {
        console.error("Error fetching review list", error);
        setError("Failed to load Review");
      }
    };
  });
  return <div>Reviews</div>;
}

export default Reviews;
