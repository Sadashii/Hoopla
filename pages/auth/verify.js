import { Button, Divider } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FlexBox, Layout, ProgressBar } from "../../src/components/atoms";
import { RedirectToAppIfLoggedIn } from "../../src/components/molecules";
import styles from "../../styles/signup.module.scss";

const Verify = ({}) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [isResponseSuccess, setIsResponseSuccess] = useState(false);
  const {query} = useRouter();
  
  useEffect(() => {
    if (!query.code) {
      return;
    }
    axios
      .post("/api/auth/verify", {
        code: query.code,
      })
      .then((res) => {
        setResponse(<>Your account has been verified.</>);
        setLoading(false);
        setIsResponseSuccess(true);
      })
      .catch((err) => {
        setIsResponseSuccess(false);
        switch (err.response.data.error) {
          case "INVALID_CODE":
            setResponse(<>It seems the verification code is invalid or expired.</>);
            setLoading(false);
            break;
          case "NO_ACCOUNT":
            setResponse(<>We could not find an account with that code.</>);
            setLoading(false);
            break;
          case "ACCOUNT_ALREADY_VERIFIED":
            setResponse(<>Your account is already verified.</>);
            setLoading(false);
            setIsResponseSuccess(true);
            break;
        }
      });
    
  }, [query]);
  
  return (
    <Layout logoOnly={true}>
      <RedirectToAppIfLoggedIn/>
      <Container maxWidth={"sm"} className={styles.signupContainer}>
        <FlexBox column align>
          <Typography variant="h3" variantMapping={"h1"} className={styles.signupTitle}>
            Email Verification
          </Typography>
          
          <div style={{width: "100%"}}>
            <Divider variant={"fullWidth"} textAlign="center" style={{margin: "8px 3px"}}/>
          </div>
          
          {loading ? (
            <div style={{width: "100%", marginTop: "2rem"}}>
              <ProgressBar/>
            </div>
          ) : (
            <FlexBox fullWidth column align style={{marginTop: "1.5rem"}}>
              <Typography variant={"h5"}>
                {response}
              </Typography>
              {isResponseSuccess ? (
                <Button
                  variant="contained"
                  color="primary"
                  className={clsx(styles.submit, "button-primary-bg-black-hover")}
                  href={`/auth/login`}
                >
                  Log In Now
                </Button>
              ) : (
                <Typography variant={"subtitle1"} sx={{position: "relative", marginTop: "1rem"}}>
                  Having trouble verifying your account? <Link href={"/auth/resend-verify"}>Resend verification
                  email</Link>
                </Typography>
              )}
            </FlexBox>
          )}
        
        </FlexBox>
      </Container>
    </Layout>
  );
};

export default Verify;