import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import CardDataDiv from '../UI/CardDataDiv';
import AuthContext from '../context/AuthContext';
import CardDataContext from '../context/CardData';
import UserCardDataContext from '../context/UserCardDataContext';

const SavedCardData = () => {
  const { userCardData } = useContext(UserCardDataContext);
  const [sortData, setSortData] = useState([]);

  useEffect(() => {
    setSortData([...userCardData].reverse());
  }, [userCardData]);
  console.log(sortData);

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

  const onClickCateogry = (e) => {
    e.preventDefault();
    const category = e.target.name;
    if (category === '최신순') {
      setSortData([...userCardData].reverse());
    }
    if (category === '오래된 순') {
      setSortData([...userCardData]);
    } else {
      const filteredData = userCardData.filter((card) => card.category === category);
      setSortData(filteredData);
    }
  };

  return (
    <SavedWrapper>
      <CardCategoryWrapper>
        <CategoryBtn onClick={onClickCateogry} name="최신순">
          최신순
        </CategoryBtn>
        <CategoryBtn onClick={onClickCateogry} name="오래된 순">
          오래된 순
        </CategoryBtn>
        <CategoryBtn onClick={onClickCateogry} name="취업">
          취업
        </CategoryBtn>
        <CategoryBtn onClick={onClickCateogry} name="여가">
          여가
        </CategoryBtn>
        <CategoryBtn onClick={onClickCateogry} name="기타">
          기타
        </CategoryBtn>
      </CardCategoryWrapper>
      <CardDataWrapper>
        {sortData.map((item, idx) => {
          return (
            <Wrapper key={idx}>
              {Object.entries(item).map(([key, value]) => {
                let newKey = changeName(key);
                if (key === 'id' || key === 'user' || key === 'content' || key === 'category') {
                  return null;
                } else {
                  return <CardDataDiv key={key} keyName={newKey} value={value !== null ? value : '-'} />;
                }
              })}
            </Wrapper>
          );
        })}
      </CardDataWrapper>
    </SavedWrapper>
  );
};

export default SavedCardData;

const SavedWrapper = styled.div`
  width: 100%;
`;

const CardCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryBtn = styled.button`
  padding: 1rem 1.5rem;
`;

const CardDataWrapper = styled.section`
  height: calc(100vh - 11rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 1rem 1.5rem;
  gap: 1rem;
`;

const Wrapper = styled.div`
  margin-right: 0.5rem;
  width: 98%;
  border: 1px solid #d9e1e8;
  border-radius: 2rem;
  box-shadow: 1px 2px 3px 0px #f2f2f2;
  background-color: #fff;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
