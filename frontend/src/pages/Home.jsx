import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { CardImg, EnvelopImg, BooksImg } from '../assets/img';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const onClickStart = (e) => {
    e.preventDefault();
    if (user !== null) {
      navigate('/cardSaving');
    } else {
      navigate('/login');
    }
  };

  return (
    <HomeWrapper>
      <ContentWrapper>
        <ContentImg src={CardImg} alt="컨텐츠" />
        <Content>
          모임에서 전달 받은 명함!
          <br /> 어떻게 저장하고 계신가요? <br />
          명함이 필요할 때 찾지 못한 경험이 있지 않으신가요?
          <br /> 혹은 '이건 어디서 받았지?' 라고 생각해본 경험 있지 않으신가요?
        </Content>
      </ContentWrapper>
      <ContentWrapper>
        <Content>
          '킵카드'에 명함을 저장하고, 명함에 대한 메모를 남겨보아요
          <br /> 또한, 명함을 카테고리별로 분류하여 필요에 따른 명함을 쉽게 찾아볼 수 있답니다 !
        </Content>
        <ContentImg src={EnvelopImg} alt="컨텐츠" />
      </ContentWrapper>
      <ContentWrapper>
        <ContentImg src={BooksImg} alt="컨텐츠" />
        <Content>명함 이미지를 업로드하고 변환된 텍스트를 자유롭게 수정하며 필요에 맞게 명함을 사용해보아요!</Content>
      </ContentWrapper>

      <StartBtn onClick={onClickStart}>시작하러 가기</StartBtn>
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2.5rem;
  margin-top: 3.9rem;
  padding: 0 1rem;
`;

const ContentWrapper = styled.div`
  padding: 1.5rem 1.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  background-color: #e1f1ff;
  border-radius: 2rem;
`;

const ContentImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 1.5;
  font-size: 15px;
`;

const StartBtn = styled.div`
  border: 1px solid #d9e1e8;
  background-color: #e1f1ff;
  border-radius: 2rem;
  padding: 12px 25px 12px 25px;
  font-weight: 600;
  font-size: 15px;
  box-shadow: 1px 2px 3px 0px #f2f2f2;
  outline: none;
  margin-top: 1rem;
  margin-bottom: 3rem;
  cursor: pointer;
  &:hover {
    background-color: #b3d7f4;
  }
`;
