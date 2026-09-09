import React, { useEffect, useRef, useState } from 'react';

const MENU_ITEMS = ['root', 'story', 'setup', 'connect'];

const Navbar = ({ myAvatar, currentMenu, setCurrentMenu, isDarkMode, setIsDarkMode }) => {
  const linksRef = useRef(null);
  const btnRefs = useRef({});
  const [pillStyle, setPillStyle] = useState({ opacity: 0 });

  useEffect(() => {
    const updatePill = () => {
      const activeBtn = btnRefs.current[currentMenu];
      const container = linksRef.current;
      if (!activeBtn || !container) return;
      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      setPillStyle({
        opacity: 1,
        width: btnRect.width,
        transform: `translateX(${btnRect.left - containerRect.left}px)`,
      });
    };

    updatePill();
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [currentMenu]);

  return (
    <nav className="navbar">
      <div className="avatar"
      style={{ cursor: 'pointer' }}
        onClick={() => setCurrentMenu('root')}
        title="Go to Home">
        <img src={myAvatar} alt="Dodi Wijaya" />
      </div>

      <div className="nav-links" ref={linksRef}>
        <span className="nav-pill" style={pillStyle} />
        {MENU_ITEMS.map((item) => (
          <button
            key={item}
            ref={(el) => { btnRefs.current[item] = el; }}
            className={`nav-btn ${currentMenu === item ? 'active' : ''}`}
            onClick={() => setCurrentMenu(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
        <span className={`theme-icon ${isDarkMode ? 'spin-in' : 'spin-in-alt'}`} key={isDarkMode ? 'moon' : 'sun'}>
          {isDarkMode ? (
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          ) : (
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          )}
        </span>
      </button>
    </nav>
  );
};

export default Navbar;