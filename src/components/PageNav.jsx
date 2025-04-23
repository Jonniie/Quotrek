import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { useAuth } from "@clerk/clerk-react";

function PageNav() {
  const { isSignedIn, isLoaded } = useAuth();

  // Directly derive the button text from isSignedIn
  const btnTxt = isSignedIn ? "Dashboard" : "Login";
  return (
    <nav className={styles.nav + " section"}>
      <Logo />

      <ul>
        <li>
          <NavLink
            to={isLoaded && isSignedIn ? "/app" : "/login"}
            className={styles.ctaLink}
          >
            {btnTxt}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
