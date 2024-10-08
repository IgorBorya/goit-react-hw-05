import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieReviews.module.css";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjFjZWRkYmQ1NWYxYmIzNzU5ZmI5NTFjYjk2MGEyNSIsIm5iZiI6MTcyODI5MDMxMy40NzU0MjQsInN1YiI6IjY2ZjUzNjMxNGY5NDljN2E1YzQ3ZGFiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CZ8RqKO9WeHSARNxnjXPUDMGwuuQVzwy8ZANiT3HUpk";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error("Failed to fetch movie reviews", error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h4>{review.author}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
