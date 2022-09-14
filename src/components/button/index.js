import React from "react";
import "./style.css";

function MyButton({ children, ...props }) {
  return (
    <button className="my-button" {...props}>
      {children}
    </button>
  );
}

export default MyButton;
