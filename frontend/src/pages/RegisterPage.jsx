import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import styled from 'styled-components';

import ContentWrapper from '../UI/ContentWrapper';
import Input from '../common/Input';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [signupValid, setSignupValid] = useState(false);
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(username, password, password2);
  };

  useEffect(() => {
    const passwordValid = password.length !== 0 && password === password2;
    const idValid = username.length !== 0;

    setSignupValid((prev) => {
      if (passwordValid && idValid) {
        return true;
      }
    });
  }, [password, password2, username]);

  return (
    <ContentWrapper header="👨‍👨‍👧‍👧 &nbsp;회원가입" onSubmit={handleSubmit}>
      <Input type="text" label="아이디" placeholder="아이디" onChange={(e) => setUsername(e.target.value)} required />
      <Input
        type="password"
        label="비밀번호"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Input
        type="password"
        label="비밀번호 확인"
        placeholder="비밀번호 확인"
        onChange={(e) => setPassword2(e.target.value)}
        required
      />

      <p>{password2 !== password ? '비밀번호가 일치하지 않습니다' : ''}</p>

      <BtnWrapper>
        <SubmitCustomBtn type="submit" disabled={!signupValid ? true : false} $valid={signupValid}>
          회원가입
        </SubmitCustomBtn>
      </BtnWrapper>
    </ContentWrapper>
  );
}

export default Register;

const SignupBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.8rem;
  width: 100%;

  font-size: 17px;
  font-weight: bold;
  cursor: ${({ $valid }) => ($valid ? 'pointer' : 'default')};
  background-color: ${({ $valid, theme }) => ($valid ? theme.colors.darkGreen : theme.colors.gray)};
  color: ${({ $valid, theme }) => ($valid ? theme.colors.ivory : theme.colors.white)};
`;

const SubmitCustomBtn = styled.button`
  background-color: #fcf6f5;
  width: 100%;
  border-radius: 1rem;
  border: 1px solid ${({ $valid }) => ($valid ? '#8aaae5' : '')};
  padding: 8px 17px 8px 17px;
  font-weight: 600;
  font-size: 15px;
  box-shadow: 1px 2px 3px 0px #f2f2f2;
  outline: none;
  margin-bottom: 3rem;
  cursor: ${({ $valid }) => ($valid ? 'pointer' : 'default')};
  &:hover {
    background-color: ${({ $valid }) => ($valid ? '#e1f1ff' : '')};
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
