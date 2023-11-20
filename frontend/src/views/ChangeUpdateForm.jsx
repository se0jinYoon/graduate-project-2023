import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import AuthContext from '../context/AuthContext';
import CardDataContext from '../context/CardData';
import ContentWrapper from '../UI/ContentWrapper';

// 서버에서 저장된 값 (GET /posts/<post_id>/)받아오기 -> input의 value로 자동 보여지게
// 이미지 위에 띄워주기
// 수정 후 submit하면 put 요청 보내기 /posts/<post_id>/ -> post의 id값 받아와서 ..
// 저장된 명함 페이지로 이동

const ChangeUpdateForm = (props) => {
  const { user } = useContext(AuthContext);
  const { cardData, updateCardData, img } = useContext(CardDataContext);
  const [inputValue, setInputValue] = useState({
    ...cardData,
  });
  const navigate = useNavigate();
  const [cardDataId, setCardDataId] = useState(0);

  const updateCardForm = async (e) => {
    e.preventDefault();
    console.log(inputValue);
    updateCardData(inputValue);
    console.log(cardData);
    const cardId = cardData.id;
    let url = `http://localhost:8000/post/posts/${cardId}/`;
    try {
      const response = await axios.put(url, inputValue, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChangeInput = (e) => {
    const inputKey = e.target.name;
    setInputValue((prev) => {
      return {
        ...prev,
        [inputKey]: e.target.value,
      };
    });
  };

  return (
    <ContentWrapper header={'명함 데이터 수정'} onSubmit={updateCardForm}>
      {Object.entries(cardData).map(([key, value]) => {
        if (key === 'id' || key === 'user') {
          return null;
        } else {
          return (
            <InputDiv>
              <InputLabel>{key}</InputLabel>
              <UserInput name={key} defaultValue={value !== null ? value : '-'} onChange={onChangeInput} />
            </InputDiv>
          );
        }
      })}
      <button type='submit'>수정하기</button>
      <button>저장된 명함 보기</button>
    </ContentWrapper>
  );
};

export default ChangeUpdateForm;

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5rem 0;
  align-items: center;

  width: 100%;
`;

const InputLabel = styled.label`
  width: 20%;
  font-size: 15px;
`;

const UserInput = styled.input`
  display: flex;
  align-items: center;
  width: 75%;
  height: 20px;
  border: 1px solid gray;
  padding: 10px;
  font-size: 15px;

  &::placeholder {
    font-size: 15px;
  }

  &:focus {
    border: 1px solid black;
  }
`;
