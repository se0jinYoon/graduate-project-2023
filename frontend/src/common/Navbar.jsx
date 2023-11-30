// components/Navbar.js
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import styled from 'styled-components';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <NavContainer>
      <Nav>
        <h1>킵카드</h1>
        {user ? (
          <>
            <Link to="/">명함 저장하기</Link>
            <Link to="/savedData">나의 명함들</Link>
            <button onClick={logoutUser}>로그아웃</button>
          </>
        ) : (
          <>
            {/* <LinkItem to="/login">로그인</LinkItem>
            <LinkItem to="/register">회원가입</LinkItem> */}
          </>
        )}
      </Nav>
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid black;
`;

const LinkItem = styled(Link)`
  margin: 5px;
`;
