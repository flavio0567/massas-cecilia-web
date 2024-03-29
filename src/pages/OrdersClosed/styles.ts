import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  margin-top: 1rem;
`;

export const Header = styled.div`
  display: inline-flex;
  padding: 0 5px;
`;

export const SearchBox = styled.div`
  margin: 20px 0 0 320px;

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

export const OrderList = styled.div`
  padding: 0 5px;
`;

export const Order = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  color: #312e38;
  border-radius: 18px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px solid rgba(255, 255, 255, 0.9);
  min-width: 1300px;
  background: linear-gradient(to bottom left, #fff, #999999);

  p {
    font-family: 'RobotoSlab-Regular';
    font-size: 16px;
  }

  span {
    font-family: 'RobotoSlab-Regular';

    font-size: 20px;
    line-height: 23px;
    opacity: 0.7;
  }

  time {
    display: block;
    font-size: 20px;
    opacity: 0.8;
  }

  h2 {
    color: #d85d10;
    font-family: 'RobotoSlab-Medium';
    font-size: 22px;
    line-height: 23px;
  }

  h3 {
    opacity: 0.7;
    color: #fff;
  }

  button {
    font-size: 18px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#7159c1')};
    margin: 0 45px;
  }
`;

export const OrderDetail = styled.div`
  flex-grow: 0 1;
  margin: 10px;
  min-width: 280px;
`;

export const Label = styled.h1`
  color: #d85d10;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;

  span {
    margin-left: 22px;
  }
`;

export const ButtonSection = styled.div`
  display: flex;
  justify-content: space-around;

  margin: 5px;
  padding: 5px;
  border-radius: 4px;

  a {
    margin-top: 12px;
    display: flex;
    justify-content: column;
  }

  p {
    color: #312e38;
    opacity: 0.6;
    font-size: 14px;
  }
`;

export const Delivery = styled.div`
  width: 200px;
  background: #777777;
  border-radius: 6px;
  padding: 5px;
`;

export const Loja = styled.div`
  display: flex;
  justify-content: center;
  width: 200px;
  background: #f4f4f2;
  border-radius: 6px;
`;

export const Detail = styled.div`
  p {
    margin-left: 10px;
  }
`;
