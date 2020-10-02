import { AllHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import PerfectScrollBar from 'react-perfect-scrollbar';
import { lighten } from 'polished';

type ButtonProps = AllHTMLAttributes<HTMLButtonElement> & {
  hasUnread?: boolean;
  unread?: boolean;
};

type DivProps = AllHTMLAttributes<HTMLButtonElement> & {
  visible?: boolean;
};

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button<ButtonProps>`
  background: none;
  border: 0;
  position: relative;
  right: 120px;

  ${(props) =>
    props.hasUnread &&
    css`
      &::after {
        position: absolute;
        right: 40px;
        top: 0;
        width: 12px;
        height: 12px;
        background: #ff0000;
        content: '';
        border-radius: 50%;
      }
    `}
`;

export const NotificationList = styled.div<DivProps>`
  position: absolute;
  z-index: 1;
  width: 600px;
  left: calc(30% - 300px);
  top: calc(95% + 30px);
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  padding: 15px 5px;
  display: ${(props) => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 132px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgba(0, 0, 0, 0.6);
  }
`;

export const Scroll = styled(PerfectScrollBar)`
  max-height: 360px;
  padding: 5px 15px;
`;

export const Notification = styled.div<ButtonProps>`
  color: #fff;

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.6);
  }

  p {
    font-size: 20px;
    line-height: 23px;
  }

  time {
    display: block;
    font-size: 18px;
    opacity: 0.6;
  }

  button {
    font-size: 18px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#7159c1')};
    padding: 0 5px;
    margin: 0 5px;
    border-left: 2px solid rgba(255, 255, 255, 0.6);
  }

  ${(props) =>
    props.unread &&
    css`
      &::after {
        content: '';
        display: inline-block;
        margin-left: 5px;
        width: 12px;
        height: 12px;
        background: #ff892e;
        border-radius: 50%;
        margin-left: 10px;
      }
    `}
`;
