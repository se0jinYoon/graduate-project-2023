import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { CardDataProvider } from './context/CardData';
import Home from './views/HomePage';
import Login from './views/LoginPage';
import Register from './views/RegisterPage';
import ProtectedPage from './views/ProtectedPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PostForm from './views/PostForm';
import ChangeUpdateForm from './views/ChangeUpdateForm';

const App = () => {
  return (
    <Router>
      <Div className="App">
        <AuthProvider>
        <CardDataProvider>
          <Navbar />
          <Routes>
            <Route path="/protected" element={<ProtectedPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute><PostForm /></PrivateRoute> } />
            <Route path="/updateForm" element={<PrivateRoute><ChangeUpdateForm /></PrivateRoute> } />
          </Routes>
          {/* <Footer /> */}
          </CardDataProvider>
        </AuthProvider>
      </Div>
    </Router>
  );
};

export default App;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
`