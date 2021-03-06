import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Header = styled.div`
  padding: 32px 0;
  background: #d85d10;
  max-height: 180px;
`;

export const HeaderContent = styled.div`
  max-width: 1060px;
  min-width: 1060px;
  margin: -60px auto;
  display: flex;
  align-items: center;

  img {
    height: 220px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    strong {
      color: #532000;
      font-size: 20px;
    }
  }
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 20px 300px;
  svg {
    margin-right: 16px;
  }

  a {
    color: #f4ede8;
    display: block;
    margin-top: 14px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromLeft} 1.2s;

  form {
    margin-top: -50px;
    width: 540px;
    text-align: center;

    h1 {
      color: #ff9000;
      margin: 50px 0 4px;
      padding: 10px;
    }

    input {
      width: 100%;
      color: #532000;
      font-size: 18px;

      &::placeholder {
        color: #666360;
      }

      & + input {
        margin-top: 8px;
        color: #532000;
      }
    }

    button {
      background: #d85d10;
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      color: #f4ede8;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#d85d10')};
      }
    }

    a {
      color: #ff9000;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #d85d10;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#d85d10')};
    }
  }
`;
export const Aside = styled.div`
  display: flex;

  img {
    width: 400px;
    height: 400px;
    padding: 60px 60px;
  }
`;
