import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const Container = styled.div`
  justify-content: center;
  align-items: center;
`;

export const SearchBox = styled.div`
  position: absolute;
  top: 24%;
  left: 60%;
  transform: translate(-50%, -50%);
  background: #ff9000;
  height: 40px;
  border-radius: 40px;
  padding: 10px;

  &:hover {
    width: 240px;
    background: #f4ede8;
  }
`;

export const SearchButton = styled(Link)`
  color: #d85d10;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: 0;
  left: 202px;
  justify-content: center;
  align-items: center;

  svg {
    margin: 11px;
  }
`;

export const InputSearch = styled.input`
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  margin-top: 2px;
  color: #ff9000;
  transition: 0.4s;
  line-height: -50px;
  width: 240px;

  &:hover {
    width: 240px;
  }
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

  > img {
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
  margin: 24px 320px;

  h1 {
    margin: 0 14px;
  }
`;

export const ProductView = styled.div`
  min-width: 1040px;
  max-width: 1040px;
  display: flex;
  padding: 12px 12px;
  border-radius: 10px;
  background: #f1e0ad;
  opacity: 0.8;
  margin: 10px;

  a {
    color: #532000;
  }

  span {
    min-width: 120px;
    max-width: 120px;
    color: #666;
    margin: 0 15px;
    font-size: 18px;
  }

  strong {
    display: inline-block;

    width: 290px;
    color: #532000;
    font-size: 20px;
    font-weight: bold;
  }
`;

export const List = styled.div`
  min-width: 980px;
  max-width: 980px;
  padding-left: 0px;
`;
