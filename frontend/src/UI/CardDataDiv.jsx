import React from 'react';
import styled from 'styled-components';

const CardDataDiv = (props) => {
  return (
    <Wrapper>
      <CardDataKey>{props.keyName}</CardDataKey>
      <CardDataVal>{props.value}</CardDataVal>
    </Wrapper>
  );
};
export default CardDataDiv;

const Wrapper = styled.article`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  gap: 1px;
  width: 30rem;
  height:2.5rem;
  border-bottom: 1px solid grey;
`;

const CardDataKey = styled.div`
  width: 20%;
  border-right: 0.5px solid grey;
  margin-right: 1rem;
`;

const CardDataVal = styled.div`
  width: 70%
`;
