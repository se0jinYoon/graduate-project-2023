import { createContext, useContext, useState } from "react";

const UserCardDataContext = createContext();

export default UserCardDataContext;

export const UserCardDataProvider = ({children}) => {
    const [userCardData, setUserCardData] = useState([]);

    const updateUserCardData = (newData) => {
        setUserCardData(newData);
    }

    return (
        <UserCardDataContext.Provider value={{userCardData, updateUserCardData}}>
            {children}
        </UserCardDataContext.Provider>
    )
}