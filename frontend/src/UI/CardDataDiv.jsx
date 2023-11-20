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
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 1px;
`;

const CardDataKey = styled.div`
  margin-right: 10px;
`;

const CardDataVal = styled.div``;
