import React from "react";
import logoPath from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <a href="/" className="header__link">
        <img src={logoPath} alt="Логотип: Место" className="header__logo" />
      </a>
    </header>
  );
}

export default Header;
