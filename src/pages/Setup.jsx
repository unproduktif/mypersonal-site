import React from 'react';
import Reveal from '../components/Reveal';

// empty for now — add real gear here as { name, desc, link, image } objects
const setups = [];

const Setup = () => {
return (
    <>
      <header className="hero">
        <h1>my setup<span className="cursor">|</span></h1>
        <p>
          the tools and hardware i use to build, research, and over-engineer my projects.
          mostly curated for efficiency and aesthetics.
        </p>
      </header>

      <section className="setup-list">
        {setups.length === 0 ? (
          <div className="empty-list-state">
            <p>still curating this list.</p>
          </div>
        ) : (
          setups.map((group, index) => (
            <Reveal key={index} className="setup-group" delay={index * 100}>
              <h2 className="setup-category">{group.category}</h2>
              <div className="setup-grid">
                {group.items.map((item, i) => (
                  <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="setup-item-card">
                    <div className="setup-content-wrapper">
                      {item.image && (
                        <div className="setup-image-container">
                          <img src={item.image} alt={item.name} className="setup-img" />
                        </div>
                      )}
                      <div className="setup-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-desc">{item.desc}</span>
                      </div>
                    </div>
                    <div className="setup-arrow">↗</div>
                  </a>
                ))}
              </div>
            </Reveal>
          ))
        )}
      </section>
    </>
  );
};

export default Setup;