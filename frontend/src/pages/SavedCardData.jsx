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
  const [memoStates, setMemoStates] = useState(new Array(sortData.length).fill(false));

  const handleMemoClick = (idx) => {
    const newMemoStates = [...memoStates];
    newMemoStates[idx] = !newMemoStates[idx];
    setMemoStates(newMemoStates);
  };

  useEffect(() => {
    setSortData([...userCardData].reverse());
  }, [userCardData]);

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
      const filteredData = [...userCardData].reverse();
      setSortData(filteredData);
    } else if (category === '오래된 순') {
      setSortData([...userCardData]);
    } else {
      const filteredData = [...userCardData].filter((card) => card.category === category);
      setSortData(filteredData);
    }
  };
  console.log([...userCardData].reverse());

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
              <MemoBg $isClicked={memoStates[idx]}>
                <MemoEl>
                  <MemoVal>{item.content}</MemoVal>
                </MemoEl>
              </MemoBg>
              <MemoBtn onClick={() => handleMemoClick(idx)}>{memoStates[idx] ? '메모 닫기' : '메모 보기'}</MemoBtn>
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
  justify-content: space-evenly;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const CategoryBtn = styled.button`
  padding: 0.3rem 0.7rem;
  background-color: #fcf6f5;
  border-radius: 1rem;
  border: 1px solid #8aaae5;
  font-weight: 600;
  &:hover {
    background-color: #e1f1ff;
  }
`;

const CardDataWrapper = styled.section`
  height: calc(100vh - 11rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 1rem 0 1rem 1.5rem;
  gap: 1rem;
`;

const MemoBtn = styled.div`
  border: 1px solid #d9e1e8;
  border-radius: 2rem;
  background-color: #e1f1ff;
  color: #2b90d9;
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  z-index: 3;
`;

const MemoBg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 2rem;
  display: ${({ $isClicked }) => ($isClicked ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(76, 76, 76, 0.7);
`;

const Wrapper = styled.div`
  position: relative;
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
  gap: 1px;
`;

const MemoEl = styled.div`
  width: 70%;
  height: 50%;
  background-color: #fcf6f5;
  border-radius: 2rem;
  border: 1px solid #2b90d9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;

const MemoVal = styled.div`
  width: 100%;
  font-size: 14px;
  line-height: 2;
`;
