import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Header = styled.div`
  height: 100vh;
  max-height: 200px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background: #d85d10;

  > img {
    height: 260px;
    margin: 0 300px 80px;
  }

  button {
    margin: auto;
    background: transparent;
    border: 0;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: -280px;

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
`;

export const SearchBox = styled.div`
  margin: 20px 20px 0 860px;

  transform: translate(-50%, -50%);
  background: #ffc780;
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
  background: #ffc780;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -10px;
`;

export const ProductView = styled.div`
  min-width: 840px;
  max-width: 840px;
  display: flex;
  padding: 12px 12px;
  border-radius: 10px;
  background: #fff9f2;
  opacity: 0.8;
  margin: 10px;

  a {
    color: #532000;
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
  min-width: 780px;
  max-width: 780px;
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
  position: relative;

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

  div {
    background: #e8e6e6;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border-radius: 20px;

    div {
      display: flex;
      flex-direction: row;
      padding: 4px 8px;
    }

    span {
      flex-direction: column;
      color: #666;
      font-family: 'RobotoSlab-Medium';
    }
  }
`;

export const ActiveButton = styled.button`
  position: relative;
  top: 40px;
  right: 20px;
  border: 0;
  background: #fff9f2;
  width: 64px;
  height: 64px;
  cursor: pointer;

  svg {
    &:hover {
      opacity: 0.2s;
    }
  }
`;
