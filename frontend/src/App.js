import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { CardDataProvider } from './context/CardData';
import { UserCardDataProvider } from './context/UserCardDataContext';
import Home from './views/HomePage';
import Login from './views/LoginPage';
import Register from './views/RegisterPage';
import ProtectedPage from './views/ProtectedPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PostForm from './views/PostForm';
import ChangeUpdateForm from './views/ChangeUpdateForm';
import SavedCardData from './views/SavedCardData';

const App = () => {
  return (
    <Router>
      <Div className="App">
        <AuthProvider>
          <CardDataProvider>
            <UserCardDataProvider>
              <Navbar />
              <Routes>
                <Route path="/protected" element={<ProtectedPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <PostForm />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/updateForm"
                  element={
                    <PrivateRoute>
                      <ChangeUpdateForm />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/savedData"
                  element={
                    <PrivateRoute>
                      <SavedCardData />
                    </PrivateRoute>
                  }
                />
              </Routes>
              {/* <Footer /> */}
            </UserCardDataProvider>
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
`;
