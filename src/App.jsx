import React, { useState, useEffect } from 'react';
import './styles/global.css';
import './styles/components.css';
import './App.css';
import myAvatar from './assets/hero.png'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentMenu, setCurrentMenu] = useState('root');

  useEffect(() => {
    const themeClass = isDarkMode ? 'dark-mode' : '';
    document.documentElement.className = themeClass;
  }, [isDarkMode]);

  const renderContent = () => {
    switch(currentMenu) {
      case 'root':
        return <Home />;
      default:
        return (
          <div className="coming-soon">
            <h2>{currentMenu} page</h2>
            <p>coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="main-wrapper">
      <div className="container">
        <header>
          <Navbar 
            myAvatar={myAvatar}
            currentMenu={currentMenu}
            setCurrentMenu={setCurrentMenu}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        </header>
        
        <main className="main-content">
          {renderContent()}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;