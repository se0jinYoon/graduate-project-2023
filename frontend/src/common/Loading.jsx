import React from 'react';
import styled from 'styled-components';

import { CardImg } from '../assets/img';

const Loading = () => {
  return (
    <LoadingWrapper>
      <LoadingImg src={CardImg} alt="로딩중 이미지" />
      <LoadingText>명함 텍스트 변환중 ... </LoadingText>
    </LoadingWrapper>
  );
};

export default Loading;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const LoadingImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const LoadingText = styled.div`
  font-size: 15px;
`;
