import React, { useState, useEffect } from 'react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('recently'); 
  const [displayedTracks, setDisplayedTracks] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [featuredTrack, setFeaturedTrack] = useState(null);
  
  // State Audio Player Preview
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingTrackId, setPlayingTrackId] = useState(null);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      setIsLoading(true);
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
        setPlayingTrackId(null);
      }

      try {
        const endpoint = activeTab === 'top-tracks' ? '/api/top-tracks' : '/api/recently-played';
        const response = await fetch(endpoint);
        
        if (response.status === 200) {
          const data = await response.json();
          if (data.tracks && data.tracks.length > 0) {
            setDisplayedTracks(data.tracks);
            setFeaturedTrack(data.tracks[0]);
          } else {
            setDisplayedTracks([]);
            setFeaturedTrack(null);
          }
        }
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
        setDisplayedTracks([]);
        setFeaturedTrack(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpotifyData();

    return () => {
      if (currentAudio) currentAudio.pause();
    };
  }, [activeTab]);

  // Fungsi memutar preview atau fallback buka link Spotify langsung jika preview null
  const handlePlayPreview = (previewUrl, trackId, songUrl) => {
    if (!previewUrl || previewUrl === '#' || previewUrl === 'null') {
      // Fallback cerdas: langsung buka tab baru ke Spotify jika tidak ada audio file
      window.open(songUrl, "_blank");
      return;
    }

    if (playingTrackId === trackId) {
      currentAudio.pause();
      setPlayingTrackId(null);
      setCurrentAudio(null);
    } else {
      if (currentAudio) currentAudio.pause();
      
      const audio = new Audio(previewUrl);
      audio.play();
      setCurrentAudio(audio);
      setPlayingTrackId(trackId);

      audio.onended = () => {
        setPlayingTrackId(null);
        setCurrentAudio(null);
      };
    }
  };

  return (
    <>
      {/* --- HERO SECTION --- */}
      <header className="hero">
        <h1>hello, i'm dodi<span className="cursor">|</span></h1>
        <p>
          undergrad spending way too much time staring at monitors and over-engineering simple things. 
          documenting the unfiltered process of figuring it all out.
        </p>
      </header>

      {/* --- GALLERY SECTION --- */}
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

      {/* --- SPOTIFY DASHBOARD SECTION --- */}
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
          {/* CARD KIRI: FEATURED COMPONENT */}
          <div className="featured-card">
            {featuredTrack ? (
              <>
                <div className="card-header-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="rgba(255,255,255,0.3)" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.894-.982-.336.074-.67-.14-.744-.477-.074-.336.14-.67.477-.744 3.856-.88 7.15-.505 9.814 1.127.295.18.387.563.207.86zm1.224-2.72c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.082-1.182-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.676-1.116 8.244-.575 11.35 1.336.366.226.486.706.258 1.074zm.105-2.834C14.383 8.8 8.44 8.604 5.004 9.647c-.534.163-1.097-.137-1.26-.67-.163-.535.137-1.098.67-1.26 3.945-1.197 10.514-.97 14.593 1.45.482.285.64.904.354 1.386-.285.48-.903.64-1.385.355z"/>
                  </svg>
                </div>
                
                <div className="album-wrapper">
                  <img src={featuredTrack.albumImageUrl} alt={featuredTrack.title} className="featured-album-img" />
                </div>

                <div className="featured-meta">
                  <span className="badge-text">
                    {activeTab === 'top-tracks' ? '#1 track this month' : 'last played'}
                  </span>
                  <div className="track-info-main">
                    <h3 className="featured-title">{featuredTrack.title}</h3>
                    <p className="featured-artist">{featuredTrack.artist}</p>
                  </div>
                  
                  <div className="featured-actions-row">
                    <div className="featured-buttons-left">
                      <a href={featuredTrack.songUrl} target="_blank" rel="noopener noreferrer" className="btn-save-spotify">
                        + Save to Spotify
                      </a>
                      <button className="action-circle-btn">+</button>
                      <button className="action-circle-btn">➔</button>
                      <button className="action-circle-btn">•••</button>
                    </div>

                    <button 
                      className="big-play-btn"
                      onClick={() => handlePlayPreview(featuredTrack.previewUrl, featuredTrack.id, featuredTrack.songUrl)}
                      title={!featuredTrack.previewUrl ? "Open directly on Spotify" : "Play preview"}
                    >
                      {playingTrackId === featuredTrack.id ? (
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="#000"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      ) : !featuredTrack.previewUrl ? (
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="#000"><path d="M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zM9 8h2v8H9zm4 0h2v8h-2zM7 10h1v4H7zm10 0h1v4h-1z"/></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="#000"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </button>
                  </div>
                  
                  <div className="player-simulation">
                    <div className="progress-bar">
                      <div className={`progress-fill ${playingTrackId === featuredTrack.id ? 'animating' : ''}`}></div>
                    </div>
                    <div className="time-stamps">
                      <span>00:00</span>
                      <span>{featuredTrack.duration}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="card-empty-state">
                <p>crickets.</p>
              </div>
            )}
          </div>

          {/* CARD KANAN: LIST ROW TRACKS */}
          <div className="tracks-list-container">
            {isLoading ? (
              [...Array(5)].map((_, idx) => (
                <div key={idx} className="skeleton-row-card">
                  <div className="skeleton-thumb"></div>
                  <div className="skeleton-info">
                    <div className="skeleton-line line-short"></div>
                    <div className="skeleton-line line-long"></div>
                  </div>
                </div>
              ))
            ) : displayedTracks.length === 0 ? (
              <div className="empty-list-state">
                <p>empty queue. wake up my spotify.</p>
              </div>
            ) : (
              displayedTracks.map((track, index) => (
                <div 
                  key={track.id || index} 
                  className={`list-track-card row-bg-${(index % 4) + 1}`}
                >
                  <img src={track.albumImageUrl} alt={track.title} className="list-album-thumb" />
                  <div className="list-track-info" onClick={() => window.open(track.songUrl, "_blank")}>
                    <h4>{track.title}</h4>
                    <p>{track.artist}</p>
                  </div>
                  
                  <div className="list-track-controls">
                    <span className="track-duration-text">{track.duration}</span>
                    <button className="list-action-icon-btn"><span className="plus-text">+</span></button>
                    <button className="list-action-icon-btn-dots">•••</button>
                    <button 
                      className="small-play-btn"
                      onClick={() => handlePlayPreview(track.previewUrl, track.id, track.songUrl)}
                      title={!track.previewUrl ? "Open directly on Spotify" : "Play preview"}
                    >
                      {playingTrackId === track.id ? (
                        <svg viewBox="0 0 24 24" width="10" height="10" fill="#000"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      ) : !track.previewUrl ? (
                        <svg viewBox="0 0 24 24" width="9" height="9" fill="#000"><path d="M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zM9 8h2v8H9zm4 0h2v8h-2z"/></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="10" height="10" fill="#000"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;