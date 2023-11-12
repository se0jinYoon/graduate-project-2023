import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


// 로그인 했을 경우 private route에 접속 가능 OR 로그인 페이지로 보내짐
// 사용자가 있는지 없는지 확인해서 login page OR private route 안의 페이지
const PrivateRoute = () => {
  let { user } = useContext(AuthContext);
  return !user ? <Navigate to="/login" /> : <Outlet />; 
};

export default PrivateRoute;