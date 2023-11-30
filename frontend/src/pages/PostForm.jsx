import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../context/AuthContext';
import UserCardDataContext from '../context/UserCardDataContext';
import CardDataContext from '../context/CardData';
import SavedCardData from './SavedCardData';

import ContentWrapper from '../UI/ContentWrapper';
import BtnWrapper from '../common/BtnWrapper';
import Input from '../common/Input';
import PostInput from '../common/PostInput';

function PostForm() {
  const { user, authTokens } = useContext(AuthContext);
  const { cardData, updateCardData, updateCardDataImg } = useContext(CardDataContext);
  const { userCardData, updateUserCardData } = useContext(UserCardDataContext);
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
    // updateCardData(e.target.files[0])
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

  const getCardDataItem = async (e) => {
    e.preventDefault();
    const userId = user.user_id;
    let url = `http://localhost:8000/post/posts/user/${userId}`;
    e.preventDefault();
    try {
      const response = await axios.get(url);
      updateUserCardData(response.data);
      navigate('/savedData');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ContentWrapper onSubmit={handleSubmit} header="명함 저장하기">
      <Input
        type="text"
        label="제목"
        id="title"
        placeholder="제목을 입력하세요"
        value={formData.title}
        onChange={handleChange}
        className="large"
        required
      />
      <PostInput
        type="text"
        label="내용"
        id="content"
        placeholder="명함에 대한 메모를 해보아요!"
        value={formData.content}
        onChange={handleChange}
        className="large"
        required
      />

      <p>
        <input type="file" id="image" accept="image/png, image/jpeg" onChange={handleImageChange} required />
      </p>
      <input type="submit" />
      <BtnWrapper>
        <GetBtn type="button" onClick={getCardDataItem}>
          내 명함들 가져오기
        </GetBtn>
      </BtnWrapper>
    </ContentWrapper>
  );
}

export default PostForm;

const GetBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.8rem;
  width: 100%;

  font-size: 17px;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.darkGreen};
  color: ${({ theme }) => theme.colors.ivory};
`;
