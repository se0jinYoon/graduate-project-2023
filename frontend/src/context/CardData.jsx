// src/context/CardDataContext.js

import { createContext, useContext, useState } from 'react';

const CardDataContext = createContext();

export default CardDataContext;

export const CardDataProvider = ({ children }) => {
  const [cardData, setCardData] = useState({});
  const [img, setImg] = useState();

  const updateCardData = (newData) => {
    setCardData((prevData) => ({ ...prevData, ...newData }));
  };

  const updateCardDataImg = (newData) => {
    setImg(newData);
  }

  return (
    <CardDataContext.Provider value={{ cardData, updateCardData,img, updateCardDataImg }}>
      {children}
    </CardDataContext.Provider>
  );
};

// export const useCardDataContext = () => {
//   return useContext(CardDataContext);
// };
