import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  margin-top: 1rem;

  table {
    margin-top: 1rem;
    width: 100%;
    border-spacing: 0 0.5rem;
    color: #999;
    font-family: 'RobotoSlab-Medium';

    th {
      font-size: 2rem;
      font-weight: 500;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      background: #fff;
      padding: 1rem 2rem;

      h3 {
        color: #ffffff;
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
      }

      button {
        padding: 0.5rem;
        border: 1px solid #d7d7d7;
        background: #ff9000;
        border-radius: 0.5rem;
        font-size: 1.2rem;
        font-weight: 400;
        color: #ffffff;
        transition: background-color 0.2s;

        &:hover {
          background: ${shade(0.2, '#ff9000')};
        }
      }
    }
  }
`;

export const Header = styled.div`
  display: inline-flex;
  padding: 0 5px;
`;

export const Label = styled.h1`
  color: #d85d10;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;

  span {
    margin-left: 22px;
  }
`;

export const Modal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
