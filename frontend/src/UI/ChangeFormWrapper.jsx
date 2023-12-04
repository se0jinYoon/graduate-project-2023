import React from 'react';
import styled from 'styled-components';

const ChangeFormWrapper = (props, { children }) => {
  return (
    <Wrapper onSubmit={props.onSubmit}>
      <Header>{props.header}</Header>
      {props.children}
    </Wrapper>
  );
};

export default ChangeFormWrapper;

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.3rem;

  margin-top: 1rem;
  width: 100%;
  padding: 1.5rem 1rem;

  background-color: white;
`;

const Header = styled.header`
  font-size: 1.5rem;
`;
