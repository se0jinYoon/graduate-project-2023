import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { CardDataProvider } from './context/CardData';
import { UserCardDataProvider } from './context/UserCardDataContext';

import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ProtectedPage from './pages/ProtectedPage';
import Footer from './common/Footer';
import Navbar from './common/Navbar';
import PostForm from './pages/PostForm';
import ChangeUpdateForm from './pages/ChangeUpdateForm';
import SavedCardData from './pages/SavedCardData';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Div className="App">
          <AuthProvider>
            <CardDataProvider>
              <UserCardDataProvider>
                <Navbar />
                <Routes>
                  <Route path="/protected" element={<ProtectedPage />} />
                  <Route path="/login" element={<Login />} />
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
    </ThemeProvider>
  );
};

export default App;

const Div = styled.div`
position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #F7F7F9;
`;
