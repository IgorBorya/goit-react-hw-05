import { useState, useEffect } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import axios from "axios";
import styles from "./MovieDetailsPage.module.css";

export const API_KEY = "921ceddbd55f1bb3759fb951cb960a25";
export const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjFjZWRkYmQ1NWYxYmIzNzU5ZmI5NTFjYjk2MGEyNSIsIm5iZiI6MTcyODI5MDMxMy40NzU0MjQsInN1YiI6IjY2ZjUzNjMxNGY5NDljN2E1YzQ3ZGFiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CZ8RqKO9WeHSARNxnjXPUDMGwuuQVzwy8ZANiT3HUpk";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie details", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const { title, overview, genres, poster_path } = movie;

  return (
    <div className={styles.container}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={title}
        className={styles.poster}
      />
      <div className={styles.details}>
        <h2>{title}</h2>
        <p>{overview}</p>
        <h3>Genres:</h3>
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        <div className={styles.additionalInfo}>
          <Link to="cast">Cast</Link>
          <Link to="reviews">Reviews</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
