import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';
import MontserratRegularWoff from './fonts/montserrat-regular.woff';
import MontserratRegularWoff2 from './fonts/montserrat-regular.woff2';
import MontserratMediumWoff from './fonts/montserrat-medium.woff';
import MontserratMediumWoff2 from './fonts/montserrat-medium.woff2';
import MontserratBoldWoff from './fonts/montserrat-bold.woff';
import MontserratBoldWoff2 from './fonts/montserrat-bold.woff2';
import ObjectSansHeavyWoff from './fonts/objectsans-heavy.woff';
import ObjectSansHeavyWoff2 from './fonts/objectsans-heavy.woff2';

export default createGlobalStyle`
  ${normalize}

  @font-face {
    font-style: normal;
    font-weight: 400;
    font-family: "Montserrat";
    font-display: swap;
    src:
      url(${MontserratRegularWoff2}) format("woff2"),
      url(${MontserratRegularWoff}) format("woff");
  }

  @font-face {
    font-style: normal;
    font-weight: 500;
    font-family: "Montserrat";
    font-display: swap;
    src:
      url(${MontserratMediumWoff2}) format("woff2"),
      url(${MontserratMediumWoff}) format("woff");
  }

  @font-face {
    font-style: normal;
    font-weight: 700;
    font-family: "Montserrat";
    font-display: swap;
    src:
      url(${MontserratBoldWoff2}) format("woff2"),
      url(${MontserratBoldWoff}) format("woff");
  }

  @font-face {
    font-style: normal;
    font-weight: 900;
    font-family: "Object Sans";
    font-display: swap;
    src:
      url(${ObjectSansHeavyWoff2}) format("woff2"),
      url(${ObjectSansHeavyWoff}) format("woff");
  }

  :root {
    --color-brand-violet: #6d13f5;
    --color-brand-orange: #ec5d2f;
    --color-text: #737373;
    --color-text-secondary: #252b42;
    --font-montserrat: "Montserrat", Arial, sans-serif;
    --font-object-sans: "Object Sans", Arial, sans-serif;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  html {
    font-style: normal;
    font-weight: 400;
    font-size: 1rem; // 15px
    line-height: 1.4;
    font-family: "Montserrat", Arial, sans-serif;
    color: #000000;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    width: 100%;
    height: 100%;

    background-color: #ffffff;
  }

  a {
    color: #000000;
    text-decoration: none;
  }

  img,
  video {
    display: block;
    max-width: 100%;
    height: auto;
  }

  textarea {
    resize: none;
  }

  input:-webkit-autofill {
    box-shadow: inset 0 0 0 1000px $color-default-white;

    -webkit-text-fill-color: $color-default-black;
  }

  // firefox placeholder \ invalid fix + ios bdrs
  input,
  textarea {
    border-radius: 0;

    &::placeholder {
      opacity: 1;
    }

    &:invalid {
      box-shadow: none;
    }
  }

  select {
    border-radius: 0;
  }

  // chrome search X removal
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    appearance: none;
  }

  // input[number] arrows removal
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    margin: 0;

    appearance: none;
  }

  input[type="number"] {
    appearance: textfield;
  }

  // ios button \ inputs reset
  select,
  textarea,
  input:matches([type="email"],
    [type="number"],
    [type="password"],
    [type="search"],
    [type="tel"],
    [type="text"],
    [type="url"]) {
    appearance: none;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    appearance: none;
  }
`;

export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
`;
