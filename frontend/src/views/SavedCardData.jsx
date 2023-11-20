import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import CardDataDiv from '../UI/CardDataDiv';
import AuthContext from '../context/AuthContext';
import CardDataContext from '../context/CardData';
import UserCardDataContext from '../context/UserCardDataContext';

const SavedCardData = () => {
  const { userCardData } = useContext(UserCardDataContext);
  console.log(userCardData);
  return (
    <CardDataWrapper>
      {userCardData.map((item, idx) => {
        return (
          <Wrapper key={idx}>
            {Object.entries(item).map(([key, value]) => {
              if (key === 'id' || key === 'user') {
                return null;
              } else {
                return <CardDataDiv key={key} keyName={key} value={value !== null ? value : '-'} />;
              }
            })}
          </Wrapper>
        );
      })}
    </CardDataWrapper>
  );
};

export default SavedCardData;

const CardDataWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid gray;
  margin-bottom: 1rem;
`;
