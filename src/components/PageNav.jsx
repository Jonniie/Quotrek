import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { useAuth } from "@clerk/clerk-react";

function PageNav() {
  const { isSignedIn } = useAuth();

  // Directly derive the button text from isSignedIn
  const btnTxt = isSignedIn ? "Dashboard" : "Login";

  return (
    <nav className={styles.nav + " section"}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink
            to={isSignedIn ? "/app" : "/login"}
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
