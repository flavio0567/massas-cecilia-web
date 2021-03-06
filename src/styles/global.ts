import { createGlobalStyle } from 'styled-components';

import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    /* background: #ff9000; */
    background: #FFF7DE;
    color: #FFF;
    -webkit-font-smoothing: antialiased;
  }

  border-style, -moz-user-input, button, a {
    font-family: 'Roboto Slab', serif;
    font-size: 18px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
