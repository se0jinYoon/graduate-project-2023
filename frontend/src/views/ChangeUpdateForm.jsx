import React, { useState, useContext } from 'react';
import axios from 'axios';

import AuthContext from '../context/AuthContext';
import CardDataContext from '../context/CardData';
import Input from '../UI/Input';

const ChangeUpdateForm = (props) => {
  const { cardData, updateCardData } = useContext(CardDataContext);
  // 서버에서 저장된 값 (GET /posts/<post_id>/)받아오기 -> input의 value로 자동 보여지게
  // 이미지 위에 띄워주기
  // 수정 후 submit하면 put 요청 보내기 /posts/<post_id>/ -> post의 id값 받아와서 ..
  // 저장된 명함 페이지로 이동
//   const getCardDataItem = (e) => {
//     e.preventDefault();
//   };

//   const updateCardData = async (id, updatedData) => {
//     const url = `http://localhost:8000/post/posts/${id}`;
//     try {
//       const response = await axios.put(url, updatedData);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

  return (
    <>
      {Object.entries(cardData).map(([key, value]) => (
        <Input key={key} label={key} value={value} />
      ))}
    </>
  );
};

export default ChangeUpdateForm;
