import {
  Button,
  Checkbox,
  FormControl, FormControlLabel,
  TextField,
} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useState } from "react";
import { FlexBox, Layout, ProgressBar } from "../src/components/atoms";
import styles from "../styles/signup.module.scss";
import { PasswordMeter } from "password-meter";

const Signup = ({}) => {
  const [errorDetails, setErrorDetails] = useState({})
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  })
  const [passwordStrength, setPasswordStrength] = useState({})
  const strengthColors = {
    "veryWeak": "#d80000",
    "weak": "#e35400",
    "medium": "#feb401",
    "strong": "#929600",
    "veryStrong": "#69d300",
    "perfect": "#00ff00",
  }
  
  const verifyFields = (field = null, value = null) => {
    const error = {}
    
    const verifyFirstName = (value) => {
      if (value.length === 0) {
        error.firstName = "First name is required"
        return false
      }
      return true
    }

    const verifyLastName = (value) => {
      if (value.length === 0) {
        error.lastName = "Last name is required"
        return false
      }
      return true
    }
    const verifyEmail = (value) => {
      if (value.length === 0) {
        error.email = "Email is required"
        return false
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error.email = "Email is invalid"
        return false
      }
      return true
    }
    const verifyPassword = (value) => {
      if (value.length === 0) {
        error.password = "Password is required"
        return false
      }
      if (value.length < 8) {
        error.password = "Password must be at least 8 characters"
        return false
      }
      if (value.length > 32) {
        error.password = "Password must be less than 32 characters"
        return false
      }
      if (value.search(/[a-z]/) === -1 || value.search(/[A-Z]/) === -1 || value.search(/[0-9]/) === -1) {
        error.password = "Password must contain at least one lowercase letter, one uppercase letter, and one number"
        return false
      }
      return true
    }
    const verifyConfirmPassword = (value) => {
      if (value.length === 0) {
        error.confirmPassword = "Confirm password is required"
        return false
      }
      if (value !== details.password) {
        error.confirmPassword = "Passwords do not match"
        return false
      }
      return true
    }



    if (field) {
      switch (field) {
        case "firstName":
          verifyFirstName(value)
          break;
        case "lastName":
          verifyLastName(value)
          break;
        case "email":
          verifyEmail(value)
          break;
        case "password":
          verifyPassword(value)
          break;
        case "confirmPassword":
          verifyConfirmPassword(value)
          break;
      }
    } else {
      verifyFirstName(details.firstName)
      verifyLastName(details.lastName)
      verifyEmail(details.email)
      verifyPassword(details.password)
      verifyConfirmPassword(details.confirmPassword)
    }
    
    setErrorDetails(error)
    return Object.keys(error).length === 0
  }

  const onSubmit = () => {
    console.log(verifyFields());
  }
  
  const setField = (field, e) => {
    if (field === "password") {
      let strength = new PasswordMeter().getResult(e.target.value)
      setPasswordStrength(strength)
    }
    
    
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
            Create your account
          </Typography>
          <Typography variant="h5" variantMapping={'h2'} className={styles.signupSubtitle}>
            Create, share, and collaborate on your to-do lists
          </Typography>
  
          <FormControl>
            <FlexBox fullWidth justifyBetween className={styles.inputRow}>
              <TextField
                label="First name"
                variant="outlined"
                fullWidth
                value={details.firstName}
                className={styles.inputField}
                required
                error={errorDetails.firstName !== undefined}
                helperText={errorDetails.firstName}
                onChange={(e) => setField("firstName", e)}
              />
              <TextField
                fullWidth
                label="Last name"
                variant="outlined"
                value={details.lastName}
                error={errorDetails.lastName !== undefined}
                helperText={errorDetails.lastName}
                onChange={(e) => setField("lastName", e)}
              />
            </FlexBox>
  
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
  
            <FlexBox fullWidth justifyBetween className={styles.inputRow}>
              <TextField
                label="Password"
                variant="outlined"
                className={styles.inputField}
                fullWidth
                required
                type={details.showPassword ? 'text' : 'password'}
                value={details.password}
                error={errorDetails.password !== undefined}
                helperText={errorDetails.password}
                onChange={(e) => setField("password", e)}
              />
              <TextField
                label="Confirm Password"
                variant={'outlined'}
                fullWidth
                required
                type={details.showPassword ? 'text' : 'password'}
                value={details.confirmPassword}
                error={errorDetails.confirmPassword !== undefined}
                helperText={errorDetails.confirmPassword}
                onChange={(e) => setField("confirmPassword", e)}
              />
            </FlexBox>
            {details.password.length > 0 && passwordStrength.percent !== undefined && (
              <div>
                <ProgressBar
                  value={passwordStrength.percent}
                  height={5}
                  primaryColor={strengthColors[passwordStrength.status]}
                  secondaryColor={strengthColors[passwordStrength.status]}
                  backgroundColor={"transparent"}
                />
                <Typography variant="body2" sx={{textAlign: 'right', textTransform: "capitalize"}}>
                  {passwordStrength.status}
                </Typography>
              </div>
            )}
  
            <FormControlLabel
              control={
                <Checkbox
                  checked={details.showPassword}
                  onClick={() => setDetails({ ...details, showPassword: !details.showPassword })}
                />
              }
              label="Show password"
            />
  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={[styles.submit, "button-main"]}
              onClick={onSubmit}
            >
              Sign in
            </Button>
            <Typography variant="subtitle2" sx={{marginTop: '8px', textAlign: 'center', opacity: '.8'}}>
              By signing up, you agree to our <Link href={'/terms#tos'} noLinkStyle>Terms of Service</Link> and <Link href={'/terms#privacy'}>Privacy Policy</Link>
            </Typography>

          </FormControl>

        </FlexBox>
      </Container>
    </Layout>
  )
}

export default Signup;