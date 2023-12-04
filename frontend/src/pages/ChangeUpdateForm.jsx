import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import AuthContext from '../context/AuthContext';
import CardDataContext from '../context/CardData';
import ChangeFormWrapper from '../UI/ChangeFormWrapper';

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

  const changeName = (name) => {
    switch (name) {
      case 'name':
        return '이름';
      case 'company':
        return '회사';
      case 'department':
        return '부서';
      case 'address':
        return '주소';
      case 'position':
        return '직무';
      case 'tel':
        return '전화번호';
      case 'mobile':
        return '핸드폰 번호';
      case 'fax':
        return '팩스';
      case 'email':
        return '이메일';
      case 'homepage':
        return '홈페이지';
      default:
        return;
    }
  };

  function formatPhoneNumber(phoneNumber) {
    // 정규표현식을 사용하여 숫자만 추출
    const numbersOnly = phoneNumber.replace(/\D/g, '');

    // +82로 시작하는 경우 0으로 바꾸기
    const cleanedNumber = numbersOnly.startsWith('82') ? '0' + numbersOnly.slice(2) : numbersOnly;

    // 핸드폰 번호 양식에 맞게 포맷팅
    const formattedNumber = cleanedNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

    return formattedNumber;
  }

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
    <ChangeFormWrapper header={'명함 정보 수정하기'} onSubmit={updateCardForm}>
      {Object.entries(cardData).map(([key, value], idx) => {
        let newKey = changeName(key);
        let newValue = '';
        if (key === 'mobile') {
          newValue = formatPhoneNumber(value);
        }
        if (key === 'id' || key === 'user' || key === 'content' || key === 'category') {
          return null;
        } else {
          return (
            <InputDiv key={`${value}and${idx}`}>
              <InputLabel>{newKey}</InputLabel>
              {value == null ? (
                <UserInput name={key} defaultValue='-' onChange={onChangeInput} />
              ) : value.toString().length < 30 ? (
                <UserInput name={key} defaultValue={key === 'mobile' ? newValue : value} onChange={onChangeInput} />
              ) : (
                <UserTextarea name={key} defaultValue={key === 'mobile' ? newValue : value} onChange={onChangeInput} />
              )}
              {/* <UserInput
                name={key}
                defaultValue={value !== null ? (key === 'mobile' ? newValue : value) : '-'}
                onChange={onChangeInput}
                $newHeight = {value !== null ? value.toString().length : 0}
              /> */}
            </InputDiv>
          );
        }
      })}
      <UpdateBtn type="submit">수정하기</UpdateBtn>
    </ChangeFormWrapper>
  );
};

export default ChangeUpdateForm;

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 0.1rem 0;
  align-items: center;
  font-weight: 500;

  width: 100%;
`;

const InputLabel = styled.label`
  width: 20%;
  font-size: 15px;
`;

const UserInput = styled.input`
  display: flex;
  align-items: center;
  border-radius: 12px;
  width: 75%;
  height: 2.3rem;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #d9e1e8;
  color: #222426;
  overflow-wrap: break-word;

  &::placeholder {
    font-size: 15px;
  }

  &:focus {
    border: 1px solid #2b90d9;
    background-color: #fcf6f5;
  }
`;

const UserTextarea = styled.textarea`
  display: flex;
  line-height: 1.5;
  align-items: center;
  border-radius: 12px;
  width: 75%;
  height: 4.6rem;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #d9e1e8;
  color: #222426;
  overflow-wrap: break-word;

  &::placeholder {
    font-size: 15px;
  }

  &:focus {
    border: 1px solid #2b90d9;
    background-color: #fcf6f5;
  }
`;

const UpdateBtn = styled.button`
  border: 1px solid #d9e1e8;
  background-color: #e1f1ff;
  color: #3a4854;
  border-radius: 2rem;
  padding: 0.5rem 2rem 0.5rem 2rem;
  font-weight: bold;
  font-size: 17px;
  box-shadow: 1px 2px 3px 0px #f2f2f2;
  outline: none;
  margin-top: 1.5rem;
  font-family: ${({ theme }) => theme.font.fontFamily};
`;
