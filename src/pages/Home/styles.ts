import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.div`
  position: relative;
  height: 84px;
  max-width: 1000px;
  min-width: 1000px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #fd9458;

  nav {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    img {
      height: 260px;
      margin-bottom: 70px;
    }

    a {
      font-size: 14px;
      font-weight: bold;
      color: #fff6da;
      padding-left: 10px;
    }
  }

  aside {
    margin-right: 40px;
  }

  button {
    margin-left: 20px;
    background: transparent;
    border: 0;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: -240px;

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
      font-size: 22px;
    }
  }
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: #ff9000;
  }
`;

export const Orders = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 22px;
  }
`;

export const OrdersLabel = styled.div`
  display: flex;
  h1 {
    margin-left: 12px;
  }
`;

export const OrdersLinks = styled.div`
  display: flex;

  span {
    font-size: 16px;
  }
`;

export const TimeFrame = styled.div`
  margin-left: 55px;

  span {
    font-size: 18px;
  }
`;

export const TimeFrameLabel = styled.div`
  display: flex;
`;

export const SearchBox = styled.div`
  margin: 20px 20px 0 860px;

  transform: translate(-50%, -50%);
  background: #ffe5b4;
  height: 40px;
  border-radius: 40px;
  padding: 10px;

  &:hover > input {
    width: 240px;
    padding: 0 6px;
  }

  &:hover > button {
    background: #f4ede8;
  }
`;

export const InputSearch = styled.input`
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  margin-top: -5px;
  font-size: 16px;
  transition: 0.4s;
  line-height: 30px;
  width: 0px;

  &:hover {
    width: 240px;
  }
`;

export const SearchButton = styled.button`
  color: #d85d10;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 0;
  background: #ffe5b4;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -10px;
`;

export const ProductView = styled.div`
  min-width: 1060px;
  max-width: 1060px;
  display: flex;
  padding: 12px 12px;
  border-radius: 10px;
  background: #ffe5b4;
  opacity: 0.8;
  margin: 10px;

  a {
    color: #532000;
    padding-left: 40px;
  }

  span {
    min-width: 80px;
    max-width: 80px;
    color: #666;
    margin: 0 15px;
    font-size: 18px;
  }

  strong {
    display: inline-block;

    width: 600px;
    padding: 10px;
    color: #532000;
    font-size: 20px;
    font-weight: bold;
  }
`;

export const List = styled.div`
  min-width: 880px;
  max-width: 880px;
`;

export const Products = styled.div`
  display: flex;
  align-items: center;

  div {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    span {
      margin-left: 26px;
      display: flex;
      align-items: center;
      color: #666;
    }
  }
`;

export const AvatarInfo = styled.div`
  /* position: relative; */

  label {
    position: absolute;
    width: 22px;
    height: 22px;
    background: #ffcf90;
    border-radius: 50%;
    right: 36px;
    bottom: 22px;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 14px;
      height: 14px;
      color: #312e38;
    }
  }
`;

export const ProductDetail = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  strong {
    white-space: nowrap;
    overflow: hidden;
  }

  div {
    background: #ffefd5;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border-radius: 20px;

    div {
      display: flex;
      flex-direction: row;
      padding: 2px 4px;
    }

    p {
      color: #666;
      margin-right: 3px;
    }

    span {
      flex-direction: column;
      color: #666;
      font-family: 'RobotoSlab-Medium';
    }

    input {
      flex: 1;
      height: 28px;
      width: 60px;
      background: #f4ede8;
      border: 0;
      border-radius: 5px;
      color: #666;
      font-family: 'RobotoSlab-Medium';
      font-size: 16px;

      &::placeholder {
        color: #666360;
      }
    }
  }
`;

export const ActionButtons = styled.div`
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0 17px;
`;

export const ActiveButton = styled.button`
  border: 0;
  background: #ffe5b4;
  width: 35px;
  height: 35px;
  margin-left: 10px;
  cursor: pointer;
`;

export const Pagination = styled.div`
  justify-content: space-evenly;
  align-items: center;
`;

export const PaginationButton = styled.button`
  border: 0;
  background: #fff6da;
  width: 35px;
  height: 35px;
  margin-left: 50px;
  cursor: pointer;
`;
