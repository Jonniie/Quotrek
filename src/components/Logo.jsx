import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      {/* <img src="/logo.png" alt="Geolog logo" className={styles.logo} /> */}
      <p className={styles.logo}>
        🧭 <span className="logo-text">Quotrek</span>
      </p>
    </Link>
  );
}

export default Logo;
