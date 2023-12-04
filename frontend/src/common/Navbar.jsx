// components/Navbar.js
import { useContext, useState, useRef, useEffect } from 'react';
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


  return (
    <NavContainer>
      <ModalBg $isOpen={isOpen} onClick={toggleClose}/>
      <Nav>
        <List onClick={toggleOpen}>
          <FontAwesomeIcon icon={faBars} style={{ width: '1.5rem', height: '1.5rem', cursor: 'pointer' }} />
        </List>
        <List>
          <h1>킵카드</h1>
        </List>
        <List>{user ? <Link onClick={logoutUser}>로그아웃</Link> : <Link to="/login">로그인</Link>}</List>
      </Nav>
      <SideBarWrap id="sidebar" className={isOpen ? 'open' : ''}>
        <CloseImg src={CloseIconImg} alt="닫기" onClick={toggleClose} onKeyDown={toggleClose} />
        <Menu>
          <List>
            <Link to="/" onClick={toggleClose}>
              📁 &nbsp;&nbsp;명함 저장하기
            </Link>
          </List>
          <List>
            <Link to="/savedData" onClick={toggleClose}>
              📇 &nbsp;&nbsp;나의 명함들
            </Link>
          </List>
          <List>
            <Link to="/login" onClick={toggleClose}>
              👩🏻‍💻 &nbsp;&nbsp;로그인
            </Link>
          </List>
          <List>
            <Link to="/register" onClick={toggleClose}>
              👨‍👨‍👧‍👧 &nbsp;&nbsp;회원가입
            </Link>
          </List>
        </Menu>
      </SideBarWrap>
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.div`
  position: relative;
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

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 2rem;
  justify-content: flex-start;
  padding: 0 0.5rem;
`;

const CloseImg = styled.img`
  width: 1rem;
  height: 1rem;
  position: absolute;
  right: 13px;
  top: 10px;
  pointer: cursor;
`;

const List = styled.li`
  color: #3a4854;
  font-weight: 600;
  height: 2rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #b3d7f4;
  }
`;

const LinkItem = styled(Link)`
  margin: 5px;
`;

const ModalBg = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  background-color: rgba(76, 76, 76, 0.7);
  z-index: 2;
`;

const SideBarWrap = styled.div`
  z-index: 5;
  padding: 5rem 12px;
  background-color: #e1f1ff;
  height: 100vh;
  width: 14rem;
  left: -55%;
  top: 0;
  position: fixed;
  transition: 0.7s ease;

  &.open {
    position: absolute;
    left: 0;
  }
`;
