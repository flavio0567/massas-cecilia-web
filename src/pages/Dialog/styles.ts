import { AllHTMLAttributes } from 'react';
import styled from 'styled-components';

type ButtonProps = AllHTMLAttributes<HTMLButtonElement> & {
  isOpen?: boolean;
};

// export const Container = styled.div``;

// export const Badge = styled.div`
//   background: none;
//   border: 0;
//   position: relative;
//   border-radius: 5%;
//   background-color: gray;
// `;

export const Agreement = styled.div`
  height: 80px;
  padding-top: 10px;
  border: 1px solid #999;
  border-radius: 10px;
  background-color: #eee;
  margin-top: 10px;

  hr {
    width: 100%;
    height: 2px;
    margin-top: 14px;
  }
`;

export const CheckBoxAgreement = styled.button``;

export const Checkbox = styled.text`
  border: 1px solid #999;
  border-radius: 4px;
  border-width: 1px;
`;

export const TextAgreement = styled.text`
  font-size: 18px;
  color: #666;
  margin-left: -30px;
  margin-right: 30px;
`;

export const Button = styled.button<ButtonProps>`
  p {
    font-family: 'RobotoSlab-Medium';
    font-size: 20px;
    color: #ff9000;
    font-size: 40px;
  }
`;
