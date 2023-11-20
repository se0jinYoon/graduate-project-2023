import React from 'react';
import styled from 'styled-components';

const Input = (props) => {

    return (
        <InputDiv>
            <InputLabel>{props.label}</InputLabel>
            <UserInput value={props.value}></UserInput>
        </InputDiv>
    )
}

export default Input;

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem 0;
  align-items: center;

  width: 100%;
`;

const InputLabel = styled.label`
  width: 20%;
  font-size: 17px;
`;

const UserInput = styled.input`
  display: flex;
  align-items: center;
  width: 75%;
  height: 3rem;
  border: 1px solid gray;
  padding: 10px;
  font-size: 15px;

  &::placeholder {
    font-size: 15px;
  }

  &:focus {
    border: 1px solid black;
  }
`;
