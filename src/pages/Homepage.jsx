import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "@clerk/clerk-react";

export default function Homepage() {
  const { isSignedIn } = useAuth();
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section className="section">
        <h1>
          You travel the world.
          <br />
          Quotrek keeps track of your adventures.
        </h1>
        <h2>
          A world map that traces your journey, one city at a time. Capture the
          memories of every place you've explored and relive the experiences
          that shaped your travels. Share your adventures and let the world see
          where you've wandered.
        </h2>
        <Link to={isSignedIn ? "/app" : "/sign-up"} className="cta">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
