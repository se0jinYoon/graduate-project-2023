import React, { useState, useContext } from 'react';
import axios from 'axios';

import AuthContext from '../context/AuthContext';

// context에서 user ID 받아와서 연결하기!!!!!

function PostForm() {
    const { user } = useContext(AuthContext);
    // console.log(user.username);
    
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
    form_data.append('user', JSON.stringify(user));
    form_data.append('image', formData.image, formData.image.name);
    form_data.append('title', formData.title);
    form_data.append('content', formData.content);
    let url = 'http://localhost:8000/post/posts/';
    console.log(form_data);
    
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
  );
}

export default PostForm;
