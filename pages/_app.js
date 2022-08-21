import axios from "axios";
import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { AlertTemplate } from "../src/components/atoms";
import theme from '../src/theme';
import createEmotionCache from '../src/utils/createEmotionCache';
import "@fontsource/raleway";
import "../styles/styles.scss";
import { positions, Provider as AlertProvider, transitions } from "react-alert";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  
  axios.defaults.baseURL = process.env.API_URL;
  
  const alertOptions = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    transition: transitions.SCALE,
    containerStyle: {
      zIndex: 9999,
    },
  };
  
  
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </AlertProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
