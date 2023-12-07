import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../context/AuthContext';

import ContentWrapper from '../UI/ContentWrapper';
import Input from '../common/Input';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.아이디.value;
    const password = e.target.비밀번호.value;
    username.length > 0 && loginUser(username, password);
  };
  const onClickSignup = () => {
    navigate('/register');
  };

  return (
    <ContentWrapper header="👩🏻‍💻 
    로그인" onSubmit={handleSubmit}>
      <Input type="text" label="아이디" placeholder="아이디를 입력하세요" />
      <Input type="password" label="비밀번호" placeholder="비밀번호를 입력하세요" />

      <BtnWrapper>
        <SubmitCustomBtn type="submit">로그인</SubmitCustomBtn>
        <SubmitCustomBtn type="button" onClick={onClickSignup}>
          회원가입
        </SubmitCustomBtn>
      </BtnWrapper>
    </ContentWrapper>
  );
};

export default LoginPage;

const SubmitCustomBtn = styled.button`
  background-color: #fcf6f5;
  border-radius: 1rem;
  border: 1px solid #8aaae5;
  padding: 8px 17px 8px 17px;
  font-weight: 600;
  font-size: 15px;
  box-shadow: 1px 2px 3px 0px #f2f2f2;
  outline: none;
  margin-bottom: 3rem;
  &:hover {
    background-color: #e1f1ff;
  }
`;

const BtnWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  margin-top: 1rem;

  width: 100%;
`;
