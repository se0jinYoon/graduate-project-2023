import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import styled from 'styled-components';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, password, password2);
  };

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <h1>회원 가입</h1>
        <hr />
        <div>
          <Label htmlFor="username">아이디</Label>
          <input
            type="text"
            id="username"
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">비밀번호</Label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <Label htmlFor="confirm-password">비밀번호 확인</Label>
          <input
            type="password"
            id="confirm-password"
            onChange={e => setPassword2(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <p>{password2 !== password ? "비밀번호가 일치하지 않습니다" : ""}</p>
        </div>
        <button type="submit">가입</button>
      </Form>
    </section>
  );
}

export default Register;

const Label = styled.label`
    margin: 0 10px;
`

const Form = styled.form `
    display: flex;
    flex-direction: column;
    gap: 5px;
`