import React from "react";

function Header({ isDarkMode, onToggleDarkMode }) {
  return (
    <header className={isDarkMode ? "dark-mode" : ""}>
      <h1>Chatterbox</h1>
      <div className="toggle-switch">
        <input
          type="checkbox"
          id="toggle-dark-mode"
          checked={isDarkMode}
          onChange={() => onToggleDarkMode(!isDarkMode)}
        />
        <label htmlFor="toggle-dark-mode"></label>
      </div>
    </header>
  );
}

export default Header;
