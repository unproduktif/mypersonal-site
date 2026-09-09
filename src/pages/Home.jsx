import React, { useState, useEffect } from 'react';
import Reveal from '../components/Reveal';

const numberFormat = (n) => new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n);

const Home = () => {
  const [activeTab, setActiveTab] = useState('recently');
  const [displayedTracks, setDisplayedTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [ytChannel, setYtChannel] = useState(null);
  const [ytVideo, setYtVideo] = useState(null);
  const [ytLoading, setYtLoading] = useState(true);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      setIsLoading(true);
      try {
        const endpoint = activeTab === 'top-tracks' ? '/api/top-tracks' : '/api/recently-played';
        const response = await fetch(endpoint, { cache: 'no-store' });

        if (response.status === 200) {
          const data = await response.json();
          if (data.tracks && data.tracks.length > 0) {
            setDisplayedTracks(data.tracks);
          } else {
            setDisplayedTracks([]);
          }
        }
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
        setDisplayedTracks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpotifyData();
  }, [activeTab]);

  useEffect(() => {
    const fetchYoutubeData = async () => {
      setYtLoading(true);
      try {
        const response = await fetch('/api/youtube-stats');
        if (response.status === 200) {
          const data = await response.json();
          setYtChannel(data.channel || null);
          setYtVideo(data.latestVideo || null);
        }
      } catch (error) {
        console.error('Error fetching YouTube data:', error);
      } finally {
        setYtLoading(false);
      }
    };

    fetchYoutubeData();
  }, []);

  const featuredTrack = displayedTracks[0];
  const listTracks = displayedTracks.slice(1, 5);

  return (
    <>
      <header className="hero">
        <h1 className="stagger-words">
          <span style={{ '--i': 0 }}>hello,</span>{' '}
          <span style={{ '--i': 1 }}>i'm</span>{' '}
          <span style={{ '--i': 2 }}>dodi</span>
          <span className="cursor">|</span>
        </h1>
        <p className="hero-sub">
          undergrad spending way too much time staring at monitors and over-engineering simple things.
          documenting the unfiltered process of figuring it all out.
        </p>
      </header>

      <section className="gallery-stack">
        <div className="stack-card card-1">
          <div className="video-tag">brain dump</div>
          <video className="card-media" autoPlay muted loop playsInline preload="metadata">
            <source src="/videos/video-1.webm" type="video/webm" />
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
        {['/images/gallery-1.JPEG', '/images/IMG_1286.JPEG', '/images/IMG_7643.JPEG', '/images/IMG_8777.JPEG'].map((src, i) => (
          <Reveal as="div" className="photo-card" delay={i * 80} key={src}>
            <img src={src} alt={`T${i + 1}`} className="card-media" />
          </Reveal>
        ))}
      </div>

      <Reveal as="section" className="spotify-dashboard">
        <div className="dashboard-header">
          <h2 className="section-title">
            {activeTab === 'recently' ? 'on loop.' : 'staring tracklist.'}
          </h2>
          
          <div className="tab-switcher">
            <button 
              className={`tab-btn ${activeTab === 'recently' ? 'active' : ''}`}
              onClick={() => setActiveTab('recently')}
            >
              Recently Played
            </button>
            <button 
              className={`tab-btn ${activeTab === 'top-tracks' ? 'active' : ''}`}
              onClick={() => setActiveTab('top-tracks')}
            >
              Top Tracks
            </button>
          </div>
        </div>

        <div className="bento-grid">
          {isLoading ? (
            <>
              <div className="skeleton-embed-card big-skeleton"></div>
              <div className="tracks-list-container">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="skeleton-embed-card mini-skeleton"></div>
                ))}
              </div>
            </>
          ) : displayedTracks.length === 0 ? (
            <div className="empty-list-state">
              <p>empty queue. wake up my spotify.</p>
            </div>
          ) : (
            <>
              <div className="featured-embed-card">
                {featuredTrack && (
                  <iframe
                    src={`https://open.spotify.com/embed/track/${featuredTrack.id}?utm_source=generator&theme=0`}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                )}
              </div>

              <div className="tracks-list-container">
                {listTracks.map((track, index) => (
                  <div key={track.id || index} className="spotify-player-wrapper">
                    <iframe
                      src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
                      width="100%"
                      height="80"
                      frameBorder="0"
                      allowFullScreen=""
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    ></iframe>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Reveal>

      <Reveal as="section" className="youtube-dashboard">
        <h2 className="section-title">on camera.</h2>

        {ytLoading ? (
          <div className="yt-layout">
            <div className="skeleton-embed-card yt-video-skeleton"></div>
            <div className="yt-stats-row">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="skeleton-embed-card yt-stat-skeleton"></div>
              ))}
            </div>
          </div>
        ) : !ytChannel ? (
          <div className="empty-list-state">
            <p>
              channel's still warming up.{' '}
              <a href="https://youtube.com/@_dodiwijaya" target="_blank" rel="noopener noreferrer">
                check it out anyway ↗
              </a>
            </p>
          </div>
        ) : (
          <div className="yt-layout">
            <a
              className="yt-channel-row"
              href="https://youtube.com/@_dodiwijaya"
              target="_blank"
              rel="noopener noreferrer"
            >
              {ytChannel.thumbnail && (
                <img src={ytChannel.thumbnail} alt={ytChannel.title} className="yt-channel-avatar" />
              )}
              <span className="yt-channel-name">{ytChannel.title}</span>
            </a>

            {ytVideo && (
              <a
                className="yt-video-card"
                href={`https://youtube.com/watch?v=${ytVideo.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="yt-thumb-wrap">
                  {ytVideo.thumbnail && <img src={ytVideo.thumbnail} alt={ytVideo.title} className="yt-thumb" />}
                  <span className="yt-play">▶</span>
                </div>
                <div className="yt-video-info">
                  <span className="yt-video-title">{ytVideo.title}</span>
                  <span className="yt-video-meta">{numberFormat(ytVideo.viewCount)} views · latest upload</span>
                </div>
              </a>
            )}

            <div className="yt-stats-row">
              <div className="yt-stat-tile">
                <span className="yt-stat-value">{numberFormat(ytChannel.subscriberCount)}</span>
                <span className="yt-stat-label">subscribers</span>
              </div>
              <div className="yt-stat-tile">
                <span className="yt-stat-value">{numberFormat(ytChannel.viewCount)}</span>
                <span className="yt-stat-label">total views</span>
              </div>
              <div className="yt-stat-tile">
                <span className="yt-stat-value">{numberFormat(ytChannel.videoCount)}</span>
                <span className="yt-stat-label">videos</span>
              </div>
            </div>
          </div>
        )}
      </Reveal>
    </>
  );
};

export default Home;