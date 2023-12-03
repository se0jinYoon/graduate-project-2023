import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../context/AuthContext';
import UserCardDataContext from '../context/UserCardDataContext';
import CardDataContext from '../context/CardData';
import SavedCardData from './SavedCardData';
import useDropDown from '../hooks/useDropDown';

import ContentWrapper from '../UI/ContentWrapper';
import BtnWrapper from '../common/BtnWrapper';
import Input from '../common/Input';
import PostInput from '../common/PostInput';

function PostForm() {
  const { user } = useContext(AuthContext);
  const { updateCardData } = useContext(CardDataContext);
  const { updateUserCardData } = useContext(UserCardDataContext);
  // post Form 관련 state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
    category: '',
  });

  // 이미지 업로드 관련 state
  const [imageSelected, setImageSelected] = useState('선택된 파일 없음');
  const [formIsValid, setFormIsValid] = useState(false);

  // 카테고리 관련 state
  const [isShowOptions, setShowOptions] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const ref = useRef();
  const navigate = useNavigate();

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
    if (formData.title && formData.content && formData.image && formData.category) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [formData.title, formData.content, formData.image, formData.category]);
  console.log(formData);

  // title, content 입력
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // 카테고리 선택
  const handleOnChangeSelectValue = (e) => {
    const { innerText } = e.target;
    setCurrentValue(innerText);
    setFormData({
      ...formData,
      category: innerText,
    });
  };

  // 외부 클릭시 카테고리 닫히게
  const handleOutside = () => {
    setShowOptions(false);
  };
  useDropDown(ref, handleOutside);

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
      console.log(response.data);
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

      <SubmitWrapper>
        <SelectWrapper>
          <SelectBox onClick={() => setShowOptions((prev) => !prev)} ref={ref} required>
            <Label>{currentValue ? currentValue : '무엇과 관련되었나요?'}</Label>
            <SelectOptions $show={isShowOptions}>
              <Option onClick={handleOnChangeSelectValue}>취업</Option>
              <Option onClick={handleOnChangeSelectValue}>지인</Option>
              <Option onClick={handleOnChangeSelectValue}>여가</Option>
              <Option onClick={handleOnChangeSelectValue}>기타</Option>
            </SelectOptions>
          </SelectBox>
          <InputWrapper>
            <CustomInput type="file" id="image" accept="image/png, image/jpeg" onChange={handleImageChange} required />
            <UploadBtn htmlFor="image">📁 파일 선택</UploadBtn>
            <FileSelected>{imageSelected}</FileSelected>
          </InputWrapper>
        </SelectWrapper>

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

const SelectWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 1.5rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FileSelected = styled.p`
  margin-top: 0.3rem;
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
  border-radius: 2rem;
  padding: 8px 17px 8px 17px;
  font-weight: 500;
  font-size: 15px;
  box-shadow: 1px 2px 3px 0px #f2f2f2;
  outline: none;

  ${({ $formValid }) =>
    $formValid
      ? `cursor: pointer;
      color: #2b90d9;`
      : `
    cursor: not-allowed;
    color: #a2a2a1;
    opacity: 0.5;
  `}
`;

// 카테고리 박스
const SelectBox = styled.div`
  position: relative;
  width: 10.5rem;
  padding: 8px;
  border-radius: 12px;
  background-color: #ffffff;
  align-self: center;
  border: 1px solid #d9e1e8;
  cursor: pointer;
  margin-bottom: 1rem;
  &:hover {
    cursor: pointer;
    background-color: #fcf6f5;
  }
  &::before {
    content: '⌵';
    position: absolute;
    top: 1px;
    right: 8px;
    color: #49c181;
    font-size: 20px;
  }
`;
const Label = styled.label`
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
`;
const SelectOptions = styled.ul`
  position: absolute;
  top: 2.1rem;
  left: 0;
  width: 100%;
  overflow: hidden;
  z-index: 1;
  max-height: ${({ $show }) => ($show ? 'none' : '0')};
  padding: 0;
  border: ${({ $show }) => ($show ? '1px solid #d9e1e8;' : '0')};
  border-radius: 8px;
  background-color: #fff;
  color: black;
`;
const Option = styled.li`
  font-size: 14px;
  padding: 0.6rem 0.5rem;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #8aaae5;
  }
`;
