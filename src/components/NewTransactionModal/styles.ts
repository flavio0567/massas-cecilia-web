import styled from 'styled-components';

export const Container = styled.form`
  h2 {
    color: var(--orange);
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: #999;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
`;

export const SelectTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1rem;
    color: #999;
    font-weight: 400;
  }

  select {
    width: 90%;
    padding: 1rem 1.2rem;
    margin-bottom: 1.5rem;
    height: 4rem;
    border-radius: 0.24rem;

    border: 1px solid #d7d7d7;
    background: #e7e9ee;

    font-weight: 400;
    font-size: 1.5rem;

    &::placeholder {
      color: #999;
    }

    margin-right: 1rem;
  }

  button[type='button'] {
    width: 10%;
    height: 2rem;
    border: 0;
    background: transparent;
    color: var(--orange);

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
    img {
      width: 150px;
      height: 150px;
    }
  }
`;

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

  button[type='submit'] {
    width: 200%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--orange);
    color: #fff;
    border: 0;
    border-radius: 0.25rem;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }

    img {
      width: 20px;
      height: 20px;
      background: var(--orange);
    }

    span {
      display: inline-block;
      margin-left: 1rem;
      font-size: 1.5rem;
      color: var(--white);
      font-weight: 400;
    }
  }
`;
