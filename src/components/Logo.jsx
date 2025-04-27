import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <p className={styles.logo}>
        🧭 <span className="logo-text">Quotrek</span>
      </p>
    </Link>
  );
}

export default Logo;
