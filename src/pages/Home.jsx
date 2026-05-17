import React, { useState, useEffect } from 'react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('recently'); 
  const [displayedTracks, setDisplayedTracks] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

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

  const featuredTrack = displayedTracks[0];
  const listTracks = displayedTracks.slice(0, 5);

  return (
    <>
      <header className="hero">
        <h1>hello, i'm dodi<span className="cursor">|</span></h1>
        <p>
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
        <div className="photo-card">
          <img src="/images/gallery-1.JPEG" alt="T1" className="card-media" />
        </div>
        <div className="photo-card">
          <img src="/images/IMG_1286.JPEG" alt="T2" className="card-media" />
        </div>
        <div className="photo-card">
          <img src="/images/IMG_7643.JPEG" alt="T3" className="card-media" />
        </div>
        <div className="photo-card">
          <img src="/images/IMG_8777.JPEG" alt="T4" className="card-media" />
        </div>
      </div>

      <section className="spotify-dashboard">
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
      </section>
    </>
  );
};

export default Home;