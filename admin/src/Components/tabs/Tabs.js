import React, { useEffect } from "react";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import "./tabs.css";
import { ActiveTabState } from "../../Context/ActiveTabProvider";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/userRedux";

const Tabs = () => {
  const { activeTab, setActiveTab } = ActiveTabState();
  const dispatch = useDispatch();

  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("login");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("signup");
  };

  useEffect(() => {
    dispatch(logout());
    // eslint-disable-next-line
  }, []);
  return (
    <div className="Tabs">
      <ul className="nav">
        <li
          className={activeTab === "login" ? "active" : ""}
          onClick={handleTab1}
        >
          Login
        </li>
        <li
          className={activeTab === "signup" ? "active" : ""}
          onClick={handleTab2}
        >
          Signup
        </li>
      </ul>
      <div className="outlet">
        {activeTab === "login" ? <FirstTab /> : <SecondTab />}
      </div>
    </div>
  );
};
export default Tabs;
