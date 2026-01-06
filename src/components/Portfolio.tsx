import { useState, useEffect } from 'react';
import './Portfolio.css';

// Icons as SVG components
const Icons = {
  GitHub: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Email: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  ),
  Location: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  ),
  Code: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
    </svg>
  ),
  ExternalLink: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
    </svg>
  ),
  LeetCode: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
    </svg>
  ),
  Briefcase: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
    </svg>
  ),
  GraduationCap: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
};

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        <a href="#" className="navbar-logo">
          <span className="logo-text">SB</span>
        </a>

        <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-gradient-1"></div>
        <div className="hero-gradient-2"></div>
        <div className="hero-grid"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-badge animate-fadeInUp">
          <span className="badge-dot"></span>
          Open to opportunities
        </div>

        <h1 className="hero-title animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          Hi, I'm <span className="gradient-text">Shashwath BN</span>
        </h1>

        <h2 className="hero-subtitle animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          Full Stack Developer & Software Engineer
        </h2>

        <p className="hero-description animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          Results-driven developer with 1+ year of experience building scalable SaaS applications.
          Expert in PERN stack, Nuxt.js, Next.js, AWS, and Docker containerization.
        </p>

        <div className="hero-cta animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <a href="#contact" className="btn btn-primary">
            Get in Touch
          </a>
          <a href="#projects" className="btn btn-secondary">
            View Projects
          </a>
        </div>

        <div className="hero-social animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <a href="https://github.com/shashwath63" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
            <Icons.GitHub />
          </a>
          <a href="https://www.linkedin.com/in/shashwath-b-n-a287241b8" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
            <Icons.LinkedIn />
          </a>
          <a href="https://leetcode.com/shashwath63" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LeetCode">
            <Icons.LeetCode />
          </a>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
      </div>
    </section>
  );
};

// About Section
const About = () => {
  const highlights = [
    '1+ year of professional experience',
    'SaaS platform serving 1000+ users',
    '99.9% uptime achievement',
    'AWS cost optimization of 30%',
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Passionate about building innovative software solutions</p>

        <div className="about-grid">
          <div className="about-text glass-card">
            <p>
              I'm a results-driven Full-Stack Developer with hands-on expertise in building and
              deploying scalable applications. My experience spans from crafting responsive frontend
              interfaces to architecting robust backend systems.
            </p>
            <p>
              At Logicarts, I've contributed to SaaS platforms serving thousands of users,
              implementing high-performance features and optimizing cloud infrastructure.
              I'm passionate about clean code, performance optimization, and building products
              that make a difference.
            </p>
            <div className="about-location">
              <Icons.Location />
              <span>Bengaluru, Karnataka, India • Open to Relocation</span>
            </div>
          </div>

          <div className="about-highlights">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="highlight-item glass-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icons.CheckCircle />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience Section
const Experience = () => {
  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Logicarts',
      location: 'Bengaluru, Karnataka',
      period: 'August 2024 – Present',
      achievements: [
        'Contributed to end-to-end development of a SaaS platform serving 1000+ users, achieving 99.9% uptime',
        'Engineered high-performance search using Postgres full-text search, reducing data retrieval times by 40%',
        'Optimized AWS infrastructure costs by 30% through identification and removal of unused resources',
        'Streamlined deployment by containerizing backend services with Docker and AWS ECS, reducing deployment failures by 60%',
        'Developed 5+ responsive, data-driven UI components using React.js and Nuxt.js with advanced filtering',
        'Built and maintained RESTful APIs with Node.js and Express.js, integrating PostgreSQL via Sequelize ORM',
      ],
    },
  ];

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">Professional journey and achievements</p>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-card glass-card">
              <div className="experience-header">
                <div className="experience-icon">
                  <Icons.Briefcase />
                </div>
                <div className="experience-meta">
                  <h3>{exp.title}</h3>
                  <div className="experience-company">{exp.company}</div>
                  <div className="experience-details">
                    <span>{exp.location}</span>
                    <span className="separator">•</span>
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>

              <ul className="experience-achievements">
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>
                    <Icons.CheckCircle />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Skills Section
const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      skills: ['JavaScript (ES6+)', 'TypeScript', 'Java', 'Python'],
    },
    {
      title: 'Frontend',
      skills: ['React.js', 'Vue.js', 'Next.js', 'Nuxt.js', 'Redux', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material-UI'],
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Express.js', 'Spring Boot', 'RESTful APIs', 'Microservices'],
    },
    {
      title: 'Databases',
      skills: ['PostgreSQL', 'MongoDB', 'Elasticsearch', 'Sequelize ORM'],
    },
    {
      title: 'Cloud & DevOps',
      skills: ['AWS', 'Docker', 'Git', 'GitHub Actions', 'API Gateway'],
    },
    {
      title: 'Tools',
      skills: ['Webpack', 'Vite', 'Postman', 'Linux/Unix'],
    },
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">Technologies I work with</p>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-category glass-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="skill-category-title">{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const Projects = () => {
  const projects = [
    {
      title: 'Event Connect - Event Booking Platform',
      year: '2025',
      tech: ['Spring Boot 3', 'Java 17', 'Next.js 14', 'PostgreSQL', 'Docker', 'Bucket4j'],
      description: 'Architected a scalable full-stack event booking platform (similar to BookMyShow) using Spring Boot 3 for backend and Next.js 14 for frontend. Implemented API Rate Limiting using Bucket4j (5 requests/min), JWT authentication, complex PostgreSQL schemas for concurrent ticket bookings, and a "Top 3 Most Booked" analytics feature. Containerized with Docker for consistent deployment.',
      github: 'https://github.com/shashwath63/event-connect',
      link: 'https://event-connect-ten.vercel.app',
    },
    {
      title: 'Slooze - Food Ordering App',
      year: '2025',
      tech: ['Next.js', 'Prisma', 'PostgreSQL'],
      description: 'A full-stack food ordering application with Role-Based Access Control (RBAC), Location-Based Access Control, and a premium Dark/Light Mode UI. Features a responsive frontend providing seamless user experience across desktop and mobile devices.',
      link: 'https://slooze-gules.vercel.app',
      github: 'https://github.com/shashwath63/slooze',
    },
    {
      title: 'MERN E-Commerce Platform',
      year: '2025',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux', 'Stripe API'],
      description: 'A feature-rich e-commerce platform with product catalog, shopping cart, and secure checkout. Integrated Stripe payment gateway for secure transactions with order management and tracking capabilities. Utilized Redux for centralized state management.',
      github: 'https://github.com/shashwath63/mern-ecommerce',
    },
  ];

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <h2 className="section-title">Key Projects</h2>
        <p className="section-subtitle">Featured work and personal projects</p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card glass-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="project-header">
                <div className="project-icon">
                  <Icons.Code />
                </div>
                <span className="project-year">{project.year}</span>
              </div>

              <h3 className="project-title">{project.title}</h3>

              <div className="project-tech">
                {project.tech.map((t, i) => (
                  <span key={i} className="tech-badge">{t}</span>
                ))}
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-links">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    <Icons.ExternalLink />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <Icons.GitHub />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Education Section
const Education = () => {
  const education = [
    {
      degree: 'Bachelor of Engineering in Computer Science',
      institution: 'JSS Academy of Technical Education',
      location: 'Bengaluru, Karnataka',
      period: 'December 2020 – May 2024',
      details: 'CGPA: 7.5/10.0 — Relevant Coursework: Data Structures & Algorithms, Database Management, Web Development',
    },
    {
      degree: 'Full Stack Development Program - 100x Cohort',
      institution: 'Harkirat Singh - Advanced MERN Stack Technologies',
      location: 'Remote',
      period: 'October 2023 – February 2024',
      details: 'Completed an intensive, project-based program building 5+ production-grade applications using MERN stack, Docker, microservices, and AWS.',
    },
  ];

  const certifications = [
    'Full Stack Web Development (Udemy)',
    'Java 17 Programming',
  ];

  return (
    <section id="education" className="section">
      <div className="container">
        <h2 className="section-title">Education & Training</h2>
        <p className="section-subtitle">Academic background and continuous learning</p>

        <div className="education-grid">
          {education.map((edu, index) => (
            <div
              key={index}
              className="education-card glass-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="education-header">
                <div className="education-icon">
                  <Icons.GraduationCap />
                </div>
                <span className="education-period">{edu.period}</span>
              </div>
              <h3 className="education-degree">{edu.degree}</h3>
              <div className="education-institution">{edu.institution}</div>
              <div className="education-location">{edu.location}</div>
              <p className="education-details">{edu.details}</p>
            </div>
          ))}
        </div>

        <div className="certifications glass-card">
          <h3>Certifications</h3>
          <div className="cert-list">
            {certifications.map((cert, index) => (
              <div key={index} className="cert-item">
                <Icons.CheckCircle />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Let's Connect</h2>
        <p className="section-subtitle">I'm always open to discussing new opportunities</p>

        <div className="contact-content">
          <div className="contact-card glass-card">
            <div className="contact-info">
              <a href="mailto:bnshashwath@gmail.com" className="contact-item">
                <div className="contact-icon">
                  <Icons.Email />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">bnshashwath@gmail.com</span>
                </div>
              </a>

              <a href="tel:+916361075807" className="contact-item">
                <div className="contact-icon">
                  <Icons.Phone />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">+91-6361075807</span>
                </div>
              </a>

              <div className="contact-item">
                <div className="contact-icon">
                  <Icons.Location />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Location</span>
                  <span className="contact-value">Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>

            <div className="contact-social">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn">
                <Icons.LinkedIn />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/shashwath63" target="_blank" rel="noopener noreferrer" className="social-btn">
                <Icons.GitHub />
                <span>GitHub</span>
              </a>
              <a href="https://leetcode.com/shashwath63" target="_blank" rel="noopener noreferrer" className="social-btn">
                <Icons.LeetCode />
                <span>LeetCode</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <span className="logo-text">SB</span>
          <span className="footer-tagline">Building the future, one line at a time.</span>
        </div>
        <div className="footer-info">
          <p>© {new Date().getFullYear()} Shashwath BN. All rights reserved.</p>
          <p className="footer-languages">Languages: English, Kannada</p>
        </div>
      </div>
    </footer>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  return (
    <div className="portfolio">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;
