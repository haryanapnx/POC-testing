import React from "react";
import "./style.css";

function Input({ label, name, ...props }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input id={name} className="my-input" {...props} />
    </>
  );
}

export default Input;
