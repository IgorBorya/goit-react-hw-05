import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" exact activeClassName={styles.activeLink}>
        Home
      </NavLink>
      <NavLink to="/movies" activeClassName={styles.activeLink}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
