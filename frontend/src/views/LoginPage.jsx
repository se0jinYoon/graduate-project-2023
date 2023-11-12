import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>로그인 </h1>
        <hr />
        <label htmlFor="username">아이디</label>
        <input type="text" id="username" placeholder="아이디를 입력하세요" />
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" placeholder="비밀번호를 입력하세요" />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default LoginPage;

