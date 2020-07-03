import styled from 'styled-components';
import Button from '../../components/Button';

export const Container = styled.div``;

export const Header = styled.div`
  padding: 32px 0;
  background: #d85d10;
`;

export const HeaderContent = styled.div`
  max-width: 1060px;
  min-width: 1060px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 120px;
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
    width: 44px;
    height: 44px;
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
  max-width: 1120px;
  margin: auto;
  padding: 20px;

  h1 {
    margin: 24px;
  }
`;

export const ProductView = styled.div`
  display: flex;
  padding: 12px 12px;
  border-radius: 10px;
  background: #f1e0ad;
  opacity: 0.8;
  margin: 10px;
  list-style: none;

  ul {
    list-style-type: none;
    padding-left: 0px;
  }

  span {
    color: #666;
  }

  strong {
    display: inline-block;

    width: 290px;
    color: #532000;
    margin: 0 15px;
    font-weight: bold;
  }
`;

export const ButtonEdit = styled(Button)`
  background: #f0e68c;
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 15px;
`;
