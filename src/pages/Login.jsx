import styles from "./Login.module.css";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useLocation } from "react-router-dom";

export default function Login() {
  const location = useLocation();
  const isSignUp = location.pathname === "/signup";

  return (
    <main className={styles.login}>
      {isSignUp ? (
        <SignUp
          fallbackRedirectUrl="/app"
          appearance={{
            baseTheme: dark,
          }}
        />
      ) : (
        <SignIn
          oauthFlow="popup"
          fallbackRedirectUrl="/app"
          appearance={{
            baseTheme: dark,
          }}
        />
      )}
    </main>
  );
}
