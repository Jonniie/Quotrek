import styles from "./User.module.css";
import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

function User() {
  const { user } = useUser();
  return (
    <div className={styles.user}>
      {" "}
      <h2>Welcome, {user.username}!</h2>
      <UserButton />
    </div>
  );
}

export default User;
