import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieCast.module.css";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjFjZWRkYmQ1NWYxYmIzNzU5ZmI5NTFjYjk2MGEyNSIsIm5iZiI6MTcyODI5MDMxMy40NzU0MjQsInN1YiI6IjY2ZjUzNjMxNGY5NDljN2E1YzQ3ZGFiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CZ8RqKO9WeHSARNxnjXPUDMGwuuQVzwy8ZANiT3HUpk";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Failed to fetch movie cast", error);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h3>Cast</h3>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt={actor.name}
              className={styles.actorPhoto}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
