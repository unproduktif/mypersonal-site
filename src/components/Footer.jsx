import React from 'react';

import githubIcon from '../assets/icons/github.png';
import instaIcon from '../assets/icons/instagram.png';
import ytIcon from '../assets/icons/youtube.png';
import tiktokIcon from '../assets/icons/tik-tok.png';
import linkedinIcon from '../assets/icons/linkedin.png';
import spotifyIcon from '../assets/icons/spotify.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="social-links">
        
        <a href="https://github.com/unproduktif" target="_blank" rel="noreferrer">
            <img src={githubIcon} alt="Github" className="footer-icon" />
        </a>

        <a href="https://instagram.com/_dodiwijaya" target="_blank" rel="noreferrer">
          <img src={instaIcon} alt="Instagram" className="footer-icon" />
        </a>

        <a href="https://youtube.com/@_dodiwijaya" target="_blank" rel="noreferrer">
          <img src={ytIcon} alt="Youtube" className="footer-icon" />
        </a>

        <a href="https://tiktok.com/@_dodiwijaya" target="_blank" rel="noreferrer">
          <img src={tiktokIcon} alt="Tiktok" className="footer-icon" />
        </a>

        <a href="https://www.linkedin.com/in/dodiwijayaa/" target="_blank" rel="noreferrer">
          <img src={linkedinIcon} alt="Linkedin" className="footer-icon" />
        </a>

        <a href="https://open.spotify.com/user/0t7de991oxn6qjvi6rwe6u3sm" target="_blank" rel="noreferrer">
          <img src={spotifyIcon} alt="Spotify" className="footer-icon" />
        </a>
      </div>
      <p className="copyright">
        © {currentYear} Dodi Wijaya. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;