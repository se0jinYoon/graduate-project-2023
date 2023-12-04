// components/Navbar.js
import { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CloseIconImg } from '../assets/img';
import useDropDown from '../hooks/useDropDown';

const Navbar = () => {
  const ref = useRef();
  const { user, logoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(true);
  };

  const toggleClose = () => {
    setIsOpen(false);
  };

  const toggleOpendClose = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  console.log(isOpen);

  useDropDown(ref, toggleOpendClose);

  return (
    <NavContainer>
      <Nav>
        <List onClick={toggleOpen}>
          <FontAwesomeIcon icon={faBars} style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer' }} />
        </List>
        <List>
          <h1>킵카드</h1>
        </List>
        <List>
          {user ? (
            <>
              {/* <Link to="/">명함 저장하기</Link>
            <Link to="/savedData">나의 명함들</Link> */}
              <button onClick={logoutUser}>로그아웃</button>
            </>
          ) : (
            <>
              <LinkItem to="/login">로그인</LinkItem>
              {/* <LinkItem to="/register">회원가입</LinkItem> 마이페이지로 변경 */}
            </>
          )}
        </List>
      </Nav>
      <SideBarWrap id="sidebar" ref={ref} className={isOpen ? 'open' : ''}>
        <CloseImg src={CloseIconImg} alt="닫기" onClick={toggleClose} onKeyDown={toggleClose} />
        <Menu>
          <List>
            <Link to="/">명함 저장하기</Link>
          </List>
          <List>
            <Link to="/savedData">나의 명함들</Link>
          </List>
          <List>
            <LinkItem to="/login">로그인</LinkItem>
          </List>
          <List>
            <LinkItem to="/register">회원가입</LinkItem>
          </List>
        </Menu>
      </SideBarWrap>
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 4rem;
`;

const Nav = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Menu = styled.ul``;

const CloseImg = styled.img`
  width: 1rem;
  height: 1rem;
`;

const List = styled.li``;

const LinkItem = styled(Link)`
  margin: 5px;
`;

const SideBarWrap = styled.div`
  z-index: 5;
  padding: 12px;
  border-radius: 15px 0 0 15px;
  background-color: #e7e4e1;
  height: 100%;
  width: 55%;
  left: -55%;
  top: 0;
  position: fixed;
  transition: 0.5s ease;
  &.open {
    left: 0;
    transition: 0.5s ease;
  }
`;
