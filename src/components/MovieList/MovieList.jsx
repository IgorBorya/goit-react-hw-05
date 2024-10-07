import { Link } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  return <ul className={s.list}>{movies.map()}</ul>;
};
