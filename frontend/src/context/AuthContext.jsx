import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(); // Context 생성

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // localStorage에 authTokens이 있을 경우 가져와서 authTokens에 넣는다.
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );

  // localStorage에 authTokens이 있을 경우 jwtDecode로 authTokens를 decode해서 user 정보에 넣는다.
  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null
  );

  const [loading, setLoading] = useState(true);

  // react router dom 6버전 이상부터는 useHistory대신 useNavigate 사용
  const navigate = useNavigate();

  // 로그인 POST
  const loginUser = async (username, password) => {
    const response = await fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();

    // 로그인에 성공했을 경우 홈으로 이동
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access)); 
      localStorage.setItem('authTokens', JSON.stringify(data));
      navigate('/');
    } else {
      alert('Something went wrong!');
    }
  };

  // 회원가입 POST
  const registerUser = async (username, password, password2) => {
    const response = await fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        password2,
      }),
    });

    // 회원가입 성공시 로그인으로 이동
    if (response.status === 201) {
      navigate('/login');
    } else {
      alert('Something went wrong!');
    }
  };

  // 로그아웃 handler
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');

    // 로그아웃시 홈으로 이동
    navigate('/');
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return(
    <AuthContext.Provider value = {contextData}>
        {children}
    </AuthContext.Provider>
  )
};

