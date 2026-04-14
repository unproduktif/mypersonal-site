import React from 'react';

const Home = () => {
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
          <video 
            className="card-media" 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="metadata"
          >
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
    </>
  );
};

export default Home;