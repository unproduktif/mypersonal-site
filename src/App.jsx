import React, { useState, useEffect } from 'react';
import './App.css';
import myAvatar from './assets/hero.png'; 

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentMenu, setCurrentMenu] = useState('root');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className="main-wrapper">
      <div className="container">
        
        <nav className="navbar">
          <div className="avatar">
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

        {currentMenu === 'root' ? (
          <>
            <header className="hero">
              <h1>hello, i'm dodi<span className="cursor">|</span></h1>
              <p>
                undergrad spending way too much time staring at monitors and over-engineering simple things. documenting the 
                unfiltered process of figuring it all out.
              </p>
            </header>

            <section className="gallery-stack">
              <div className="stack-card card-1">
                <div className="video-tag">brain dump</div>
                <video className="card-media" autoPlay muted loop playsInline>
                  <source src="/videos/video-1.MP4" type="video/mp4" />
                </video>
              </div>
              <div className="stack-card card-2">
                <img src="/images/gallery-1.JPEG" alt="Work 1" className="card-media" />
              </div>
              <div className="stack-card card-3">
                <img src="/images/gallery-2.JPEG" alt="Work 2" className="card-media" />
              </div>
            </section>

            <div className="grid-layout scattered">
              <div className="small-box photo-card">
                <img src="/images/gallery-1.JPEG" alt="T1" className="card-media" />
              </div>
              <div className="small-box photo-card">
                <img src="/images/IMG_1286.JPEG" alt="T2" className="card-media" />
              </div>
              <div className="small-box photo-card">
                <img src="/images/IMG_7643.JPEG" alt="T3" className="card-media" />
              </div>
              <div className="small-box photo-card">
                <img src="/images/IMG_8777.JPEG" alt="T4" className="card-media" />
              </div>
            </div>
          </>
        ) : (
          <div className="coming-soon">
            <h2>{currentMenu} page</h2>
            <p>coming soon!</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;