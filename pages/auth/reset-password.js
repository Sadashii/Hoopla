import { Button, Divider, FormControl, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { FlexBox, Layout } from "../../src/components/atoms";
import { RedirectToAppIfLoggedIn } from "../../src/components/molecules";
import styles from "../../styles/signup.module.scss";

const ResetPassword = ({}) => {
  const [response, setResponse] = useState(null);
  const [isResponseSuccess, setIsResponseSuccess] = useState(false);
  const [errorDetails, setErrorDetails] = useState({});
  const [details, setDetails] = useState({
    email: "",
  });
  
  const verifyFields = (field = null, value = null) => {
    const error = {...errorDetails};
    
    const verifyEmail = (value) => {
      if (value.length === 0) {
        error.email = "Email is required";
        return false;
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error.email = "Email is invalid";
        return false;
      }
      delete error.email;
      return true;
    };
    
    if (field) {
      switch (field) {
        case "email":
          verifyEmail(value);
          break;
      }
    } else {
      verifyEmail(details.email);
    }
    
    setErrorDetails(error);
    return Object.keys(error).length === 0;
  };
  
  const onSubmit = async () => {
    if (verifyFields()) {
      await axios.post("/api/auth/reset-password", details)
        .then(res => {
          setResponse(<>We have sent you an email with the password reset link.</>);
          setIsResponseSuccess(true);
        })
        .catch((err) => {
          setIsResponseSuccess(false);
          switch (err.response.data.error) {
            case "NO_ACCOUNT":
              setResponse(<>We could not find an account with that email.</>);
              break;
            default:
              setResponse(<>Something went wrong.</>);
              break;
          }
        });
    }
  };
  
  const setField = (field, e) => {
    verifyFields(field, e.target.value);
    setDetails({
      ...details,
      [field]: e.target.value,
    });
  };
  
  return (
    <Layout logoOnly={true}>
      <RedirectToAppIfLoggedIn />
      <Container maxWidth={"sm"} className={styles.signupContainer}>
        <FlexBox column align>
          <Typography variant="h3" variantMapping={"h1"} className={styles.signupTitle}>
            Reset Password
          </Typography>
          
          <div style={{width: "100%"}}>
            <Divider variant={"fullWidth"} textAlign="center" style={{margin: "8px 3px"}}/>
          </div>
          
          <FormControl>
            <FlexBox fullWidth className={styles.inputRow} style={{marginTop: "1.5rem"}}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type={"email"}
                value={details.email}
                error={errorDetails.email !== undefined}
                helperText={errorDetails.email}
                onChange={(e) => setField("email", e)}
              />
            </FlexBox>
            
            {response && (
              <div className={isResponseSuccess ? "alert-container-success" : "alert-container-error"}>
                {response} &nbsp;
                {isResponseSuccess && (
                  <Link href={"/auth/login"}>
                    Go to login
                  </Link>
                )}
              </div>
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={clsx(styles.submit, "button-primary-bg-black-hover")}
              onClick={onSubmit}
            >
              Reset Password
            </Button>
          </FormControl>
        </FlexBox>
      </Container>
    </Layout>
  );
};

export default ResetPassword;