// src/context/CardDataContext.js

import { createContext, useContext, useState } from 'react';

const CardDataContext = createContext();

export default CardDataContext;

export const CardDataProvider = ({ children }) => {
  const [cardData, setCardData] = useState({});

  const updateCardData = (newData) => {
    setCardData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <CardDataContext.Provider value={{ cardData, updateCardData }}>
      {children}
    </CardDataContext.Provider>
  );
};

// export const useCardDataContext = () => {
//   return useContext(CardDataContext);
// };
