// components/Navbar.js
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import styled from 'styled-components';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <nav>
      <div>
        <h1>명함 OCR!</h1>
        <div>
          {user ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/protected">Protected Page</Link>
              <button onClick={logoutUser}>Logout</button>
            </>
          ) : (
            <>
              <LinkItem to="/login">Login</LinkItem>
              <LinkItem to="/register">Register</LinkItem>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const LinkItem = styled(Link)`
    margin: 5px;
`