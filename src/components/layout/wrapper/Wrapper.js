import React from "react";
import Header from "../header";
import BottomNavigation from "../../bottom-nav";
import "./style.css";

function Wrapper({ children }) {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        {children}
        <BottomNavigation />
      </div>
    </div>
  );
}

export default Wrapper;
