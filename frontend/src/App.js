import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Home from './views/HomePage';
import Login from './views/LoginPage';
import Register from './views/RegisterPage';
import ProtectedPage from './views/ProtectedPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const App = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append('image', formData.image, formData.image.name);
    form_data.append('title', formData.title);
    form_data.append('content', formData.content);
    let url = 'http://localhost:8000/api/posts/';

    axios
      .post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Navbar />
          <Routes>
          <PrivateRoute component={ProtectedPage} path="/protected" exact />
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <Route component={Home} path="/" />
          </Routes>
        </AuthProvider>


        {/* card POST */}
        <form onSubmit={handleSubmit}>
          <p>
            <input type="text" placeholder="Title" id="title" value={formData.title} onChange={handleChange} required />
          </p>
          <p>
            <input
              type="text"
              placeholder="Content"
              id="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <input type="file" id="image" accept="image/png, image/jpeg" onChange={handleImageChange} required />
          </p>
          <input type="submit" />
        </form>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
