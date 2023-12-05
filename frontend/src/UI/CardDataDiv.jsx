import React from 'react';
import styled from 'styled-components';

const CardDataDiv = (props) => {
  return (
    <Wrapper $lineLength={props.value.toString().length}>
      <CardDataKey>{props.keyName}</CardDataKey>
      <CardDataVal>{props.value}</CardDataVal>
    </Wrapper>
  );
};
export default CardDataDiv;

const Wrapper = styled.article`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  height: ${({ $lineLength }) => ($lineLength < 20 ? '2.5rem' : $lineLength > 40 ? '3.5rem' : '3rem')};
  gap: 1px;
`;

const CardDataKey = styled.div`
  width: 25%;
  padding-right: 0.3rem;
  font-size: 15px;
`;

const CardDataVal = styled.div`
  width: 70%;
  line-height: 1.5;
  padding-left: 1rem;
  border-left: 0.5px solid grey;
`;
