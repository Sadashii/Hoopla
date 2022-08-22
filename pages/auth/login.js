import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControl, IconButton, InputAdornment,
  TextField,
} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { FlexBox, Layout } from "../../src/components/atoms";
import styles from "../../styles/signup.module.scss";
import { GoogleIcon } from "../../src/components/icons"

const Login = ({}) => {
  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState({})
  const [details, setDetails] = useState({
    email: "",
    password: "",
    showPassword: false,
  })
  
  const verifyFields = (field = null, value = null) => {
    const error = {...errorDetails}

    const verifyEmail = (value) => {
      if (value.length === 0) {
        error.email = "Email is required"
        return false
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error.email = "Email is invalid"
        return false
      }
      delete error.email
      return true
    }
    const verifyPassword = (value) => {
      if (value.length === 0) {
        error.password = "Password is required"
        return false
      }
      if (value.length < 8) {
        error.password = "Password is too short"
        return false
      }
      if (value.length > 32) {
        error.password = "Password is too long"
        return false
      }
      delete error.password
      return true
    }
    
    if (field) {
      switch (field) {
        case "email":
          verifyEmail(value)
          break;
        case "password":
          verifyPassword(value)
          break;
      }
    } else {
      verifyEmail(details.email)
      verifyPassword(details.password)
    }
    
    setErrorDetails(error)
    return Object.keys(error).length === 0
  }
  
  const onSubmit = async () => {
    if (verifyFields()) {
      await axios.post("/api/auth/login", details)
        .then(res => {
          // login workflow
        })
        .catch((err) => {
          switch (err.response.data.error) {
            case "NO_ACCOUNT":
              setError("There is no account with this email.")
              break;
            case "INVALID_PASSWORD":
              setError("The password is incorrect.")
              break;
            case "NOT_VERIFIED":
              setError(<>
                Your account is not verified, <Link href={"/auth/resend-verify"}>resend verification email</Link>.
                </>)
              break;
            default:
              setError("An unknown error has occurred, please try again later.")
          }
        })
    }
  }
  
  const setField = (field, e) => {
    verifyFields(field, e.target.value)
    setDetails({
      ...details,
      [field]: e.target.value,
    })
  }
  
  return (
    <Layout logoOnly={true}>
      <Container maxWidth={"sm"} className={styles.signupContainer}>
        <FlexBox column align>
          <Typography variant="h3" variantMapping={'h1'} className={styles.signupTitle}>
            Log in
          </Typography>
          <Typography variant="h5" variantMapping={'h2'} className={styles.signupSubtitle}>
            Login and start your journey with us
          </Typography>
          
          <FlexBox fullWidth column align>
            <Button variant="contained" color="primary" className={'button-primary-bg-white'} style={{width: "100%"}}>
              <FlexBox fullWidth align justifyBetween className={styles.externalSignup}>
                <FlexBox align><GoogleIcon /></FlexBox>
                <span>Log in with Google</span>
                <span>&nbsp;</span>
              </FlexBox>
            </Button>
          </FlexBox>
          
          <div style={{width: '100%'}}>
            <Divider variant={'fullWidth'} textAlign="center" style={{margin: '8px 3px'}}>or</Divider>
          </div>
          
          
          <FormControl>
            <FlexBox fullWidth className={styles.inputRow}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type={"email"}
                required
                value={details.email}
                error={errorDetails.email !== undefined}
                helperText={errorDetails.email}
                onChange={(e) => setField("email", e)}
              />
            </FlexBox>
            
            <FlexBox fullWidth column justifyBetween className={styles.inputRow}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                required
                type={details.showPassword ? 'text' : 'password'}
                value={details.password}
                error={errorDetails.password !== undefined}
                helperText={errorDetails.password}
                onChange={(e) => setField("password", e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setDetails({...details, showPassword: !details.showPassword})}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {details.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div style={{width: '100%', textAlign: "right", fontSize: '.8rem', marginTop: '.25rem'}}>
                <Link href={"/auth/forgot-password"}>Forgot password?</Link>
              </div>
            </FlexBox>
  
  
            {error && (
              <div className={'alert-container-error'}>
                {error}
              </div>
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={[styles.submit, "button-primary-bg-black-hover"]}
              onClick={onSubmit}
            >
              Log in
            </Button>
            
            <Typography variant="subtitle2" sx={{marginTop: '16px', textAlign: 'center', opacity: '.8'}}>
              Don't have an account? <Link href={'/auth/signup/'} noLinkStyle>Sign up now</Link>
            </Typography>
          
          </FormControl>
        
        </FlexBox>
      </Container>
    </Layout>
  )
}

export default Login;