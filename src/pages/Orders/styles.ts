import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div``;

export const Header = styled.div`
  padding: 0 5px;
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
  min-width: 970px;
  background: linear-gradient(to bottom right, #ff9000, #fff7de);

  p {
    font-family: 'RobotoSlab-Regular';
    font-size: 12px;
  }

  span {
    font-family: 'RobotoSlab-Medium';

    font-size: 20px;
    line-height: 23px;
    opacity: 0.7;
  }

  time {
    display: block;
    font-size: 18px;
    opacity: 0.7;
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
    /* padding: 0 5px; */
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
  font-size: 22px;
  line-height: 23px;
`;

export const ButtonSection = styled.div`
  display: flex;
  justify-content: space-around;
  opacity: 0.5;
  border: 1px solid #fff;

  margin: 5px;
  padding: 5px;
  border-radius: 4px;
`;

export const Delivery = styled.div`
  width: 200px;
  background: #d85d10;
  border-radius: 6px;
`;

export const Loja = styled.div`
  display: flex;
  justify-content: center;
  width: 200px;
  background: #d2f6c5;
  border-radius: 6px;
`;

export const Detail = styled.div``;
