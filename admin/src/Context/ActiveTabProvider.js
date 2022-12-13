import React, { useState, createContext, useContext } from "react";

const ActiveTabContext = createContext();
const ActiveTabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [notifications, setNotifications] = useState([]);

  return (
    <ActiveTabContext.Provider
      value={{
        activeTab,
        setActiveTab,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </ActiveTabContext.Provider>
  );
};
export const ActiveTabState = () => {
  return useContext(ActiveTabContext);
};
export default ActiveTabProvider;
