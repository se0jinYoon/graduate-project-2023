import React from 'react';
import styled from 'styled-components';

const ContentWrapper = (props, {children}) => {
    return (
        <Wrapper onSubmit={props.onSubmit}>
            <Header>{props.header}</Header>
            {props.children}
        </Wrapper>
    )
}

export default ContentWrapper;

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  width: 100%;
  padding: 0 1rem;
  margin-top: 1.5rem;

  border-radius: 1rem;
  background-color: white
`

const Header = styled.header`
    font-size: 1.5rem;
`