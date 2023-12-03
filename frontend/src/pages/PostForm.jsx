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
  const [imageSelected, setImageSelected] = useState('선택된 파일 없음');
  const [formIsValid, setFormIsValid] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
    cateogry: '',
  });

  // 파일 선택 여부 렌더링
  useEffect(() => {
    if (formData.image) {
      setImageSelected('선택 완료!');
    } else {
      setImageSelected('선택된 파일 없음');
    }
  }, [formData.image]);

  // 입력 form valid에 따른 명함 저장 활성화
  useEffect(() => {
    if (formData.title && formData.content && formData.image) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [formData.title, formData.content, formData.image]);

  // title, content 입력
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // 이미지 선택
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // 백에 폼 전송 POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append('user', JSON.stringify(user));
    form_data.append('image', formData.image, formData.image.name);
    form_data.append('title', formData.title);
    form_data.append('content', formData.content);
    form_data.append('category', formData.category);
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

  // 카드 데이터 가져오기 GET
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

      <select id="category" value={formData.category} onChange={handleChange} required>
        <option value="">카테고리 선택</option>
        <option value="취업">취업</option>
        <option value="지인">지인</option>
        <option value="기타">기타</option>
      </select>

      <SubmitWrapper>
        <InputWrapper>
          <CustomInput type="file" id="image" accept="image/png, image/jpeg" onChange={handleImageChange} required />
          <UploadBtn htmlFor="image">📁 파일 선택</UploadBtn>
          <FileSelected>{imageSelected}</FileSelected>
        </InputWrapper>

        <SubmitCustomBtn type="submit" value="명함 저장하기" $formValid={formIsValid} />
      </SubmitWrapper>

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

const SubmitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const FileSelected = styled.p`
  font-size: 13px;
  color: #a2a2a1;
`;

const CustomInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;

  &:focus,
  &:hover {
    cursor: pointer;
    background-color: #fcf6f5;
  }
`;

const UploadBtn = styled.label`
  border: 1px solid #d9e1e8;
  background-color: #fff;
  color: #2b90d9;
  border-radius: 2rem;
  padding: 8px 17px 8px 17px;
  font-weight: 500;
  font-size: 15px;
  box-shadow: 1px 2px 3px 0px #f2f2f2;
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: #fcf6f5;
  }
`;

const SubmitCustomBtn = styled.input`
  border: 1px solid #d9e1e8;
  background-color: #fff;
  color: #2b90d9;
  border-radius: 2rem;
  padding: 8px 17px 8px 17px;
  font-weight: 500;
  font-size: 15px;
  box-shadow: 1px 2px 3px 0px #f2f2f2;
  outline: none;

  ${({ $formValid }) =>
    !$formValid &&
    `
    cursor: not-allowed;
    color: #a2a2a1;
    opacity: 0.5;
  `}

  &:hover {
    cursor: pointer;
    background-color: #fcf6f5;
  }
`;
