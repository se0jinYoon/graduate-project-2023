import React from 'react';

export const Login = () => {
  return (
    <>
      <h2>로그인</h2>
      <form>
        <input name="username" placeholder="username"></input>
        <input name="password" placeholder="password"></input>
        <button>로그인</button>
      </form>
    </>
  );
};

export default Login;
