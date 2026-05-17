import React from 'react';

const Setup = () => {
    const setups = [
        {
            category: "gear",
            items: [
                { 
                  name: "Laptop Stand Aluminium", 
                  desc: "Essential for ergonomic coding sessions", 
                  link: "https://www.tiktok.com/",
                  image: "images/setup/mouse.jpg"
                },
                { 
                  name: "Logitech M240", 
                  desc: "Silent and reliable Bluetooth mouse for daily productivity", 
                  link: "#", 
                  image: "images/setup/mouse.jpg"
                },
            ]
        }
    ];

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
        {setups.map((group, index) => (
          <div key={index} className="setup-group">
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
          </div>
        ))}
      </section>
    </>
  );
};

export default Setup;