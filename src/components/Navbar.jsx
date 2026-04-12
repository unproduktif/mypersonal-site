import React from 'react';

const Navbar = ({ myAvatar, currentMenu, setCurrentMenu, isDarkMode, setIsDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="avatar"
      style={{ cursor: 'pointer' }} 
        onClick={() => setCurrentMenu('root')}
        title="Go to Home">
        <img src={myAvatar} alt="Dodi Wijaya" />
      </div>

      <div className="nav-links">
        {['root', 'story', 'setup', 'connect'].map((item) => (
          <button 
            key={item}
            className={`nav-btn ${currentMenu === item ? 'active' : ''}`}
            onClick={() => setCurrentMenu(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? (
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
        ) : (
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
        )}
      </button>
    </nav>
  );
};

export default Navbar;