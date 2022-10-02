import { Button } from "@mui/material";
import Link from "next/link";
import styles from "./styles.module.scss";

const AuthButtons = ({ login = true, signup = true }) => {
  return (
    <>
      {login && (
        <Link href={"/auth/login/"} noLinkStyle>
          <Button variant="text" color="primary" className={styles.buttonLogin}>
            Log In
          </Button>
        </Link>
      )}
      {signup && (
        <Link href={"/auth/signup/"} noLinkStyle>
          <Button variant="contained" color="primary"
                  className={styles.buttonSignup}>
            Get Started
          </Button>
        </Link>
      )}
    </>
  );
};

export default AuthButtons;