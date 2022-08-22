import { createTheme } from "@mui/material/styles";
import themeColours from "./variables.module.scss";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: themeColours.primaryColor,
    },
    secondary: {
      main: themeColours.secondaryColor,
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h1: {
      fontFamily: "'Raleway', sans-serif",
      fontWeight: 700,
      fontSize: "3.5rem",
    },
    h2: {
      fontFamily: "'Raleway', sans-serif",
      fontSize: "2.5rem",
    },
    h3: {
      fontFamily: "'Raleway', sans-serif",
      fontSize: "2.2rem",
    },
    h4: {
      fontFamily: "'Raleway', sans-serif",
      fontSize: "1.5rem",
    },
    button: {
      textTransform: "none",
      textDecoration: "none",
    },
  },
});

export default theme;

// https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=04A3CB&secondary.color=d60a54
