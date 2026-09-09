import React, { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';

const GITHUB_USERNAME = 'unproduktif';

const hobbies = [
  { icon: '🤿', name: 'diving & snorkeling' },
  { icon: '🥾', name: 'hiking' },
  { icon: '🎬', name: 'content creation (aspiring)' },
  { icon: '💻', name: 'side-project ngoprek' },
];

// edit this list as your work/organizational experience grows
const experience = [
  {
    role: 'Practicum Assistant for Digital Image Processing',
    org: 'University of Mataram',
    type: 'Part-time',
    period: 'Apr 2026 - Jun 2026 · 3 mos',
    location: 'Mataram, West Nusa Tenggara, Indonesia · On-site',
    bullets: [
      'Assisted students in understanding fundamental digital image processing concepts through hands-on practicum sessions.',
      'Guided students in applying image processing techniques through practical programming exercises.',
      'Assisted students in implementing image processing methods and troubleshooting technical and programming issues.',
      'Explained practicum materials and helped students connect theoretical concepts with practical applications in image analysis.',
      'Created and evaluated practical assessment questions to assess students’ understanding of digital image processing concepts.',
    ],
    certificate: 'Sertifikat Asisten Praktikum Pengolahan Citra Digital — Semester Genap 2025/2026',
    skills: ['Digital Image Processing', 'Image Processing'],
    extraSkills: 3,
  },
  {
    role: 'Practicum Assistant for Database Systems',
    org: 'University of Mataram',
    type: 'Part-time',
    period: 'Oct 2025 - Dec 2025 · 3 mos',
    location: 'Mataram, West Nusa Tenggara, Indonesia · On-site',
    bullets: [
      'Assisted students in understanding fundamental database concepts through hands-on laboratory sessions.',
      'Guided students in applying relational database concepts, data modeling, and SQL queries.',
      'Assisted students in writing and troubleshooting SQL queries during practical exercises.',
      'Provided technical guidance in identifying and resolving database implementation errors.',
      'Created and evaluated practical assessment questions to assess students’ understanding of database concepts and SQL.',
    ],
    certificate: 'Sertifikat Asisten Praktikum Sistem Basis Data — Semester Ganjil 2025/2026',
    skills: ['SQL', 'Database Management System (DBMS)'],
    extraSkills: 3,
  },
  {
    role: 'Practicum Assistant for Algorithms and Data Structures',
    org: 'University of Mataram',
    type: 'Part-time',
    period: 'Oct 2025 - Dec 2025 · 3 mos',
    location: 'Mataram, West Nusa Tenggara, Indonesia · On-site',
    bullets: [
      'Assisted students in understanding fundamental algorithms and data structures through hands-on programming exercises.',
      'Guided students in implementing algorithms and applying appropriate data structures to solve computational problems.',
      'Assisted students in debugging code and troubleshooting logical and implementation errors during practicum sessions.',
      'Explained practicum materials and provided technical guidance to support students’ understanding of algorithmic concepts.',
      'Created and evaluated practical assessment questions to assess students’ programming and problem-solving skills.',
    ],
    certificate: 'Sertifikat Asisten Praktikum Algoritma dan Struktur Data — Semester Ganjil 2025/2026',
    skills: ['Algorithms', 'Data Structures'],
    extraSkills: 4,
  },
  {
    role: 'Practicum Assistant for Digital Systems',
    org: 'University of Mataram',
    type: 'Part-time',
    period: 'Oct 2024 - Dec 2024 · 3 mos',
    location: 'Mataram, West Nusa Tenggara, Indonesia · On-site',
    bullets: [
      'Assisted students in understanding fundamental concepts of Digital Systems through hands-on practicum sessions.',
      'Guided students through practical exercises involving digital logic and helped them apply theoretical concepts to practical implementations.',
      'Provided technical assistance and troubleshooting support during practicum sessions.',
      'Explained practicum materials and assisted students in resolving difficulties encountered during practical activities.',
      'Evaluated students’ practical work and provided feedback to support their learning outcomes.',
    ],
    certificate: 'Certificate of Appreciation – Digital Systems Practicum Assistant, Semester Ganjil 2024/2025',
    skills: ['Problem Solving', 'Teaching'],
    extraSkills: 2,
  },
];

const Story = () => {
  const [openIndexes, setOpenIndexes] = useState(() => new Set([0]));
  const [projects, setProjects] = useState(null);
  const [projectsError, setProjectsError] = useState(false);

  const toggleExp = (index) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  useEffect(() => {
    let cancelled = false;

    const loadProjects = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        if (!res.ok) throw new Error('github api error');
        const data = await res.json();
        const curated = data
          .filter((repo) => !repo.fork)
          .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at)))
          .slice(0, 6);
        if (!cancelled) setProjects(curated);
      } catch {
        if (!cancelled) setProjectsError(true);
      }
    };

    loadProjects();
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <header className="hero">
        <h1>my story<span className="cursor">|</span></h1>
        <p>
          a bit about who i am outside the code editor, the work i've done,
          and the projects i keep building on the side.
        </p>
      </header>

      <section className="story-section">
        <div className="section-label">hobbies</div>
        <div className="hobby-grid">
          {hobbies.map((hobby, index) => (
            <Reveal key={hobby.name} as="div" className="hobby-card" delay={index * 70}>
              <span className="hobby-icon">{hobby.icon}</span>
              <span className="hobby-name">{hobby.name}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="story-section">
        <div className="section-label">experience</div>
        <div className="experience-list">
          {experience.map((exp, index) => {
            const isOpen = openIndexes.has(index);
            return (
              <Reveal key={exp.role + exp.period} as="div" className={`exp-card ${isOpen ? 'open' : ''}`} delay={index * 80}>
                <button
                  type="button"
                  className="exp-header"
                  onClick={() => toggleExp(index)}
                  aria-expanded={isOpen}
                >
                  <div className="exp-heading">
                    <span className="exp-role">{exp.role}</span>
                    <span className="exp-org">{exp.org} · {exp.type}</span>
                    <span className="exp-meta">{exp.period}</span>
                    <span className="exp-meta">{exp.location}</span>
                  </div>
                  <span className="exp-toggle">+</span>
                </button>

                <div className="exp-body">
                  <div className="exp-body-inner">
                    <ul className="exp-bullets">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>

                    {exp.certificate && (
                      <div className="exp-certificate">
                        🎓 <span>{exp.certificate}</span>
                      </div>
                    )}

                    <div className="skill-chips">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="skill-chip">{skill}</span>
                      ))}
                      {exp.extraSkills > 0 && (
                        <span className="skill-chip more">+{exp.extraSkills} more</span>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="story-section">
        <div className="section-label">projects</div>

        {projectsError ? (
          <div className="projects-error">
            couldn't load projects right now.{' '}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-main)', fontWeight: 600, textDecoration: 'underline' }}
            >
              check them out on github ↗
            </a>
          </div>
        ) : (
          <div className="project-grid">
            {projects === null
              ? [...Array(6)].map((_, i) => <div key={i} className="project-skeleton" />)
              : projects.map((repo, index) => (
                <Reveal
                  key={repo.id}
                  as="a"
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card"
                  delay={index * 60}
                >
                  <div className="project-card-header">
                    <span className="project-name">{repo.name}</span>
                    <span className="project-arrow">↗</span>
                  </div>
                  <p className="project-desc">{repo.description || 'no description yet.'}</p>
                  <div className="project-footer">
                    {repo.language && (
                      <span className="project-lang">
                        <span className="project-lang-dot" />
                        {repo.language}
                      </span>
                    )}
                    <span className="project-stars">★ {repo.stargazers_count}</span>
                  </div>
                </Reveal>
              ))}
          </div>
        )}

        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="projects-footer-link"
        >
          view all repositories on github ↗
        </a>
      </section>
    </>
  );
};

export default Story;
