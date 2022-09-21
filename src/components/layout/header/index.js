import React from 'react';
import "./style.css";

function Header() {
  return (
    <header id="header" data-testid="header">
      <h1 className="title">Example Project</h1>
      <i className="subtitle">Testing</i>
    </header>
  );
}

export default Header;
