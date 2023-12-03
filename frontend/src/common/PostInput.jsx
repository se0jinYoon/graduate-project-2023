import React, { useRef } from 'react';
import styled from 'styled-components';

const PostInput = (props) => {
  return (
    <InputDiv>
      <InputLabel>{props.label}</InputLabel>
      <UserInput
        className={props.className}
        type={props.type}
        name={props.label}
        placeholder={props.placeholder}
        content={props.content}
        onChange={props.onChange}
        id={props.id}
      />
    </InputDiv>
  );
};

export default PostInput;

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
  font-size: 15px;
`;

const UserInput = styled.textarea`
  display: flex;
  align-items: center;
  width: 80%;
  height: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 10px;
  font-size: 15px;

  &::placeholder {
    font-size: 13px;
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.black};
  }

  &.large {
    height: 10rem;
  }
`;
