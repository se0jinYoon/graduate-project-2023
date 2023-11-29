import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../context/AuthContext';

import ContentWrapper from '../UI/ContentWrapper';
import Input from '../common/Input';
import BtnWrapper from '../common/BtnWrapper';

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
    <ContentWrapper header="로그인" onSubmit={handleSubmit}>
      <Input type="text" label="아이디" placeholder="아이디를 입력하세요" />
      <Input type="password" label="비밀번호" placeholder="비밀번호를 입력하세요" />

      <BtnWrapper>
      <LoginBtn $login={true} type="submit">
        로그인
      </LoginBtn>
      <LoginBtn $login={false} type="button" onClick={onClickSignup}>
        회원가입
      </LoginBtn>
      </BtnWrapper>
    </ContentWrapper>
  );
};

export default LoginPage;

const LoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.8rem;
  width: 100%;

  font-size: 17px;
  font-weight: bold;
  background-color: ${({ $login, theme }) => ($login ? theme.colors.darkGreen : theme.colors.darkIvory)};
  color: ${({ $login, theme }) => ($login ? theme.colors.ivory : theme.colors.brown)};
`;
