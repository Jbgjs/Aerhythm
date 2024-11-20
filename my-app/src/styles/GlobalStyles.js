import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #f5f5f5;
    color: #333;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`;

export default GlobalStyles;