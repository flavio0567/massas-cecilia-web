import { createGlobalStyle } from 'styled-components';

import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  :root {
    --background: #FFF7DE;
    --white: #FFF;
    --orange: #d85d10;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: var(--background);
    color: var(--white);

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

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content {
    width: 100%;
    max-width: 476px;
    background: var(--background);
    padding: 3rem;
    position: relative;
    border-radius: 0.24rem;
  }

  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.7);
    }
  }

  .react-modal-selected {
    height: 4rem;
    font-size: 1.5rem;
    background: transparent;
    font-weight: 400;
  }
`;
