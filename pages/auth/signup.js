import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Checkbox, CircularProgress, Divider, FormControl, FormControlLabel, IconButton, InputAdornment, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { PasswordMeter } from "password-meter";
import { useState } from "react";
import { FlexBox, Layout, ProgressBar } from "../../src/components/atoms";
import { GoogleIcon } from "../../src/components/icons";
import { RedirectToAppIfLoggedIn } from "../../src/components/molecules";
import GeneralHelper from "../../src/utils/GeneralHelper";
import styles from "../../styles/auth.module.scss";

const Signup = ({}) => {
  const [response, setResponse] = useState(null);
  const [isResponseSuccess, setIsResponseSuccess] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState({});
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false,
    marketingConsent: true
  });
  const [passwordStrength, setPasswordStrength] = useState({});
  const strengthColors = {
    "veryWeak": "#d80000",
    "weak": "#e35400",
    "medium": "#feb401",
    "strong": "#929600",
    "veryStrong": "#69d300",
    "perfect": "#00ff00"
  };
  
  const verifyFields = (field = null, value = null) => {
    const error = { ...errorDetails };
    
    const verifyUsername = (value) => {
      if (value.length === 0) {
        error.username = "Display name is required";
        return false;
      }
      delete error.username;
      return true;
    };
    
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
    const verifyPassword = (value) => {
      if (value.length === 0) {
        error.password = "Password is required";
        return false;
      }
      if (value.length < 8) {
        error.password = "Password must be at least 8 characters";
        return false;
      }
      if (value.length > 32) {
        error.password = "Password must be less than 32 characters";
        return false;
      }
      if (value.search(/[a-z]/) === -1 || value.search(/[A-Z]/) === -1 ||
        value.search(/[0-9]/) === -1) {
        error.password = "Password must contain at least one lowercase letter, one uppercase letter, and one number";
        return false;
      }
      delete error.password;
      return true;
    };
    
    if (field) {
      switch (field) {
        case "username":
          verifyUsername(value);
          break;
        case "email":
          verifyEmail(value);
          break;
        case "password":
          verifyPassword(value);
          break;
      }
    } else {
      verifyUsername(details.username);
      verifyEmail(details.email);
      verifyPassword(details.password);
    }
    
    setErrorDetails(error);
    return Object.keys(error).length === 0;
  };
  
  const onSubmit = async () => {
    if (verifyFields()) {
      setSignupLoading(true);
      await axios.post(`/api/auth/signup`, details).then((res) => {
        setResponse(<>We have sent you an email with the verification link.</>);
        setIsResponseSuccess(true);
        setSignupLoading(false);
      }).catch((err) => {
        setResponse(<>{err.response.data.error}</>);
        setIsResponseSuccess(false);
        setSignupLoading(false);
      });
    }
  };
  
  const setField = (field, e) => {
    if (field === "password") {
      let strength = new PasswordMeter().getResult(e.target.value);
      setPasswordStrength(strength);
    }
    
    verifyFields(field, e.target.value);
    setDetails({
      ...details,
      [field]: e.target.value
    });
  };
  
  return (
    <Layout logoOnly={true}>
      {GeneralHelper.generateHead("Register")}
      <RedirectToAppIfLoggedIn/>
      <Container maxWidth={"sm"} className={styles.signupContainer}>
        <FlexBox column align>
          <Typography variant="h3" variantMapping={"h1"}
                      className={styles.signupTitle}>
            Create your account
          </Typography>
          <Typography variant="h5" variantMapping={"h2"}
                      className={styles.signupSubtitle}>
            Create, share, and collaborate on your to-do lists
          </Typography>
          
          <FlexBox fullWidth column align>
            <Button variant="contained" color="primary"
                    className={"button-primary-bg-white"}
                    style={{ width: "100%" }}>
              <FlexBox fullWidth align justifyBetween
                       className={styles.externalSignup}>
                <FlexBox align><GoogleIcon/></FlexBox>
                <span>Sign up with Google</span>
                <span>&nbsp;</span>
              </FlexBox>
            </Button>
          </FlexBox>
          
          <div style={{ width: "100%" }}>
            <Divider variant={"fullWidth"} textAlign="center"
                     style={{ margin: "8px 3px" }}>or</Divider>
          </div>
          
          
          <FormControl>
            <FlexBox fullWidth className={styles.inputRow}>
              <TextField
                label="Display name"
                variant="outlined"
                fullWidth
                value={details.username}
                error={errorDetails.username !== undefined}
                helperText={errorDetails.username}
                onChange={(e) => setField("username", e)}
              />
            </FlexBox>
            
            <FlexBox fullWidth className={styles.inputRow}>
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
            
            <FlexBox fullWidth justifyBetween className={styles.inputRow}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type={details.showPassword ? "text" : "password"}
                value={details.password}
                error={errorDetails.password !== undefined}
                helperText={errorDetails.password}
                onChange={(e) => setField("password", e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setDetails(
                          { ...details, showPassword: !details.showPassword })}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {details.showPassword ? <Visibility/> :
                          <VisibilityOff/>}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </FlexBox>
            {details.password.length > 0 && passwordStrength.percent !==
              undefined && (
                <div>
                  <ProgressBar
                    value={passwordStrength.percent}
                    height={5}
                    primaryColor={strengthColors[passwordStrength.status]}
                    secondaryColor={strengthColors[passwordStrength.status]}
                    backgroundColor={"transparent"}
                    variant={"determinate"}
                  />
                  <Typography variant="body2" sx={{
                    textAlign: "right",
                    textTransform: "capitalize"
                  }}>
                    {passwordStrength.status}
                  </Typography>
                </div>
              )}
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={details.marketingConsent}
                  onClick={() => setDetails({
                    ...details,
                    marketingConsent: !details.marketingConsent
                  })}
                />
              }
              label="I agree to receive cool marketing emails and occasional updates, we promise to not spam you :)"
              sx={{ marginTop: "1.5rem" }}
            />
            
            {response && (
              <div className={isResponseSuccess
                ? "alert-container-success"
                : "alert-container-error"}
                   style={{ marginTop: "1rem" }}>
                {response}
              </div>
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={clsx(styles.submit, signupLoading
                ? "button-primary-bg-black"
                : "button-primary-bg-black-hover")}
              onClick={onSubmit}
            >
              {signupLoading ? (
                <CircularProgress size={35}/>
              ) : "Sign up"}
            </Button>
            
            <Typography variant="subtitle2" sx={{
              marginTop: "8px",
              textAlign: "center",
              opacity: ".8"
            }}>
              By signing up, you agree to our <Link href={"/terms#tos"}
                                                    noLinkStyle>Terms of
              Service</Link> and <Link
              href={"/terms#privacy"}>Privacy Policy</Link>
            </Typography>
            
            <Typography variant="subtitle2" sx={{
              marginTop: "16px",
              textAlign: "center",
              opacity: ".8"
            }}>
              Have an account? <Link href={"/auth/login/"} noLinkStyle>Go to
              login</Link>
            </Typography>
          
          </FormControl>
        
        </FlexBox>
      </Container>
    </Layout>
  );
};

export default Signup;