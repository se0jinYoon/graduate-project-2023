import React, { useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../context/AuthContext';
import CardDataContext from '../context/CardData';

function PostForm() {
  const { user, authTokens } = useContext(AuthContext);
  const { cardData, updateCardData } = useContext(CardDataContext);
  // const [cardDataItem, setCardDataItem] = useState({});
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append('user', JSON.stringify(user));
    form_data.append('image', formData.image, formData.image.name);
    form_data.append('title', formData.title);
    form_data.append('content', formData.content);
    let url = 'http://localhost:8000/post/posts/';

    try {
      const response = await axios.post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      updateCardData(response.data);
      // console.log(response.data)
      navigate('/updateForm');
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(cardData);

  const getCardDataItem = async (e) => {
    let url = 'http://localhost:8000/post/posts/';
    e.preventDefault();
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
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

      <button type="button" onClick={getCardDataItem}>
        카드데이터가져오기
      </button>
    </>
  );
}

export default PostForm;
