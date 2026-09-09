import React, { useState } from 'react';
import Reveal from '../components/Reveal';

import githubIcon from '../assets/icons/github.png';
import instaIcon from '../assets/icons/instagram.png';
import ytIcon from '../assets/icons/youtube.png';
import tiktokIcon from '../assets/icons/tik-tok.png';
import linkedinIcon from '../assets/icons/linkedin.png';
import spotifyIcon from '../assets/icons/spotify.png';

// TODO: replace with the email you want shown publicly
const EMAIL = 'hello@dodiwijaya.dev';

const socials = [
  { name: 'GitHub', handle: '@unproduktif', href: 'https://github.com/unproduktif', icon: githubIcon },
  { name: 'Instagram', handle: '@_dodiwijaya', href: 'https://instagram.com/_dodiwijaya', icon: instaIcon },
  { name: 'YouTube', handle: '@_dodiwijaya', href: 'https://youtube.com/@_dodiwijaya', icon: ytIcon },
  { name: 'TikTok', handle: '@_dodiwijaya', href: 'https://tiktok.com/@_dodiwijaya', icon: tiktokIcon },
  { name: 'LinkedIn', handle: 'dodiwijayaa', href: 'https://www.linkedin.com/in/dodiwijayaa/', icon: linkedinIcon },
  { name: 'Spotify', handle: 'on loop', href: 'https://open.spotify.com/user/0t7de991oxn6qjvi6rwe6u3sm', icon: spotifyIcon },
];

const Connect = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <>
      <header className="hero">
        <h1>let's connect<span className="cursor">|</span></h1>
        <p>
          got a project, an idea, or just want to talk about over-engineered side quests?
          my inbox and dms are open.
        </p>
      </header>

      <Reveal
        className="email-card"
        onClick={handleCopyEmail}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCopyEmail(); } }}
        role="button"
        tabIndex={0}
      >
        <div className="email-card-text">
          <span className="email-label">say hi</span>
          <span className="email-address">{EMAIL}</span>
        </div>
        <span className={`email-copy-btn ${copied ? 'copied' : ''}`}>
          {copied ? 'copied ✓' : 'copy ↗'}
        </span>
      </Reveal>

      <section className="connect-grid">
        {socials.map((item, index) => (
          <Reveal
            key={item.name}
            as="a"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="connect-card"
            delay={index * 70}
          >
            <img src={item.icon} alt={item.name} className="connect-icon" />
            <div className="connect-info">
              <span className="connect-name">{item.name}</span>
              <span className="connect-handle">{item.handle}</span>
            </div>
            <span className="connect-arrow">↗</span>
          </Reveal>
        ))}
      </section>
    </>
  );
};

export default Connect;
