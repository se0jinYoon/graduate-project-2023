// access token의 수명이 매우 짧아서, 서버로 요청이 가기 전에 요청을 가로챈다
// token이 유효한지 아닌지 확인 -> 유효하지 않으면 refresh로 새로운 토큰 발급
// axios의 interceptors 사용하기

import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import dayjs from 'dayjs';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const baseURL = 'http://127.0.0.1:8000/api';

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  }); // 중요! Bearer 인증 방식을 알려주기 위해 'Bearer Token'형식으로 보내줘야함

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwtDecode(authTokens.access); // decode해서 만료날짜 알기
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1; // 토큰만료 상태 체크

    if (!isExpired) return req; // 만료 안되면 access토큰 사용

    const response = await axios.post(`${baseURL}/token/refresh/`, {
      refresh: authTokens.refresh,
    }); // 만료 되었을 경우 refresh토큰을 사용해서 access 토큰 재발급

    localStorage.setItem('authTokens', JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUser(jwtDecode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;