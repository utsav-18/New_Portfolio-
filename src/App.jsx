import { lazy, memo, Suspense, useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  FaArrowRight,
  FaAward,
  FaCloud,
  FaCode,
  FaDownload,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedinIn,
  FaLocationArrow,
  FaReact,
  FaServer,
  FaTwitter,
} from "react-icons/fa";
import "./App.css";
import aayrahImg from "./assets/images/aayrah.png";
import lubImg from "./assets/images/lub.png";
import arpitImg from "./assets/images/arpit.png";
import parthrahiImg from "./assets/images/parthrahi.png";
import airbnbImg from "./assets/images/airbnb.png";
import kvsImg from "./assets/images/kvs.png";
import resumePdf from "./assets/Utsav_Resume.pdf";

const Hyperspeed = lazy(() => import("./Hyperspeed"));

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: FaLinkedinIn },
  { label: "Twitter", href: "https://x.com/", icon: FaTwitter },
];

const skills = [
  { name: "React.js", icon: FaReact, tone: "cyan" },
  { name: "Node.js", icon: FaServer, tone: "blue" },
  { name: "Cloud Computing", icon: FaCloud, tone: "violet" },
  { name: "Full Stack Dev", icon: FaCode, tone: "emerald" },
];

const projects = [
  {
    name: "Aayrah Tech Workshop",
    image: aayrahImg,
    description:
      "A registration-focused landing page for a training workshop with premium hero content, strong CTAs, and polished UI flow.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js"],
    github: "https://github.com/utsav-18/NodeAndRazorpay",
    live: "https://workshop.aayrahtech.com/",
  },
  {
    name: "Industrial Lubrication System",
    image: lubImg,
    description:
      "An industrial product website showcasing lubrication systems, quotation flow, and a clear service-led presentation.",
    stack: ["React", "Responsive UI", "Branding", "Layout"],
    github: "https://github.com/Muskan-3/Industrial_lubrication_system",
    live: "https://nikslubrication.in/",
  },
  {
    name: "Optimize with Arpit",
    image: arpitImg,
    description:
      "A marketing-focused portfolio for a growth consultant, built to highlight services, credibility, and conversion.",
    stack: ["HTML", "CSS", "Performance", "UI/UX"],
    github: "https://github.com/utsav-18/The_Portfolio",
    live: "https://optimizewitharpit.com/",
  },
  {
    name: "Parth Rahi",
    image: parthrahiImg,
    description:
      "A mobility and ride-booking concept with a bold hero, simple navigation, and app-download style actions.",
    stack: ["React", "Landing Page", "Motion", "Branding"],
    github: "https://github.com/utsav-18/ParthRahi",
    live: "https://parthrahi.com/",
  },
  {
    name: "Mini Airbnb",
    image: airbnbImg,
    description:
      "A listings experience inspired by Airbnb, with browseable cards, destination imagery, and a clean marketplace feel.",
    stack: ["React", "Listings", "MongoDB", "Express"],
    github: "https://github.com/utsav-18/Mini-Airbnb",
    live: "https://mini-airbnb-izxb.onrender.com",
  },
  {
    name: "KVS Kabaddi Academy",
    image: kvsImg,
    description:
      "A sports academy landing page featuring athletes, training programs, and a strong community-oriented identity.",
    stack: ["HTML", "CSS", "JavaScript", "Dashboard"],
    github: "https://github.com/utsav-18/Kabaddi-Academy",
    live: "https://example.com/",
  },
];

const experience = [
  {
    title: "Full Stack Developer",
    org: "Freelance / Personal Projects",
    period: "2023 - Present",
    details:
      "Building polished React interfaces, API-powered dashboards, and cloud-ready web apps with a strong focus on performance and storytelling.",
  },
  {
    title: "Cloud Computing Student",
    org: "Academic Track",
    period: "2022 - Present",
    details:
      "Exploring deployment, distributed systems, and infrastructure concepts while translating them into production-minded frontend work.",
  },
];

const certifications = [
  "AWS Cloud Fundamentals",
  "Frontend Development Specialization",
  "React & UI Engineering",
  "MERN Stack Bootcamp",
];

const stats = [
  { label: "Projects Built", value: "12+" },
  { label: "Frontend Focus", value: "React" },
  { label: "Cloud Interest", value: "AWS" },
  { label: "Deployment Ready", value: "Yes" },
];

const heroLines = [
  "Crafting futuristic web experiences.",
  "Designing premium interfaces that feel alive.",
  "Shipping full stack ideas into polished products.",
];

function getDeviceProfile() {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      canHover: true,
      lowPower: false,
    };
  }

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  const hardwareConcurrency = navigator.hardwareConcurrency ?? 8;
  const deviceMemory = navigator.deviceMemory ?? 8;

  return {
    isMobile,
    canHover,
    lowPower: isMobile || prefersReducedMotion || saveData || hardwareConcurrency <= 4 || deviceMemory <= 4,
  };
}

function profilesMatch(left, right) {
  return left.isMobile === right.isMobile && left.canHover === right.canHover && left.lowPower === right.lowPower;
}

function useTypingLoop(words, typeSpeed = 70, holdSpeed = 1500) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const delay = deleting ? typeSpeed / 2 : typeSpeed;
    const timer = setTimeout(() => {
      if (!deleting) {
        const nextText = current.slice(0, text.length + 1);
        setText(nextText);
        if (nextText === current) {
          setDeleting(true);
        }
      } else {
        const nextText = current.slice(0, Math.max(text.length - 1, 0));
        setText(nextText);
        if (nextText === "") {
          setDeleting(false);
          setIndex((value) => value + 1);
        }
      }
    }, text ? delay : holdSpeed);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typeSpeed, holdSpeed]);

  return text;
}

const SectionHeading = memo(function SectionHeading({ kicker, title, description }) {
  return (
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <span className="section-kicker">{kicker}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </motion.div>
  );
});

// Keep the typing loop isolated so the rest of the page does not rerender on every character.
const TypingLine = memo(function TypingLine({ words }) {
  const typedLine = useTypingLoop(words);

  return (
    <motion.p className="hero-typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }}>
      {typedLine}
      <span className="typing-cursor">|</span>
    </motion.p>
  );
});

function App() {
  const [deviceProfile, setDeviceProfile] = useState(() => getDeviceProfile());
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.2 });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateProfile = () => {
      setDeviceProfile((currentProfile) => {
        const nextProfile = getDeviceProfile();
        return profilesMatch(currentProfile, nextProfile) ? currentProfile : nextProfile;
      });
    };

    updateProfile();
    window.addEventListener("resize", updateProfile, { passive: true });
    window.addEventListener("orientationchange", updateProfile);

    return () => {
      window.removeEventListener("resize", updateProfile);
      window.removeEventListener("orientationchange", updateProfile);
    };
  }, []);

  const heroEffectOptions = useMemo(
    () => {
      const simplified = deviceProfile.lowPower;

      return {
        distortion: simplified ? "deepDistortionStill" : "deepDistortion",
        length: simplified ? 220 : 360,
        roadWidth: simplified ? 8 : 10,
        islandWidth: simplified ? 1.4 : 2,
        lanesPerRoad: simplified ? 3 : 4,
        fov: simplified ? 72 : 90,
        fovSpeedUp: simplified ? 78 : 90,
        speedUp: simplified ? 1.05 : 1.5,
        carLightsFade: simplified ? 0.18 : 0.28,
        totalSideLightSticks: simplified ? 8 : 16,
        lightPairsPerRoadWay: simplified ? 10 : 32,
        shoulderLinesWidthPercentage: 0.05,
        brokenLinesWidthPercentage: 0.1,
        brokenLinesLengthPercentage: 0.5,
        lightStickWidth: simplified ? [0.1, 0.36] : [0.12, 0.5],
        lightStickHeight: simplified ? [1.1, 1.45] : [1.3, 1.7],
        movingAwaySpeed: simplified ? [28, 40] : [42, 60],
        movingCloserSpeed: simplified ? [-64, -92] : [-88, -120],
        carLightsLength: simplified ? [8, 28] : [10, 62],
        carLightsRadius: simplified ? [0.04, 0.1] : [0.05, 0.14],
        carWidthPercentage: simplified ? [0.28, 0.42] : [0.3, 0.5],
        carShiftX: simplified ? [-0.35, 0.35] : [-0.8, 0.8],
        carFloorSeparation: simplified ? [0, 3] : [0, 5],
        roadSegments: simplified ? 52 : 100,
        carGeometrySegments: simplified ? 20 : 40,
        enablePostProcessing: !simplified,
        pixelRatioCap: simplified ? 1 : 1.5,
        colors: {
          roadColor: 0x06070c,
          islandColor: 0x0a0f18,
          background: 0x000000,
          shoulderLines: 0xa3e8ff,
          brokenLines: 0xffffff,
          leftCars: [0x8b5cf6, 0xff4fd8, 0x0ea5e9],
          rightCars: [0x22d3ee, 0x38bdf8, 0x60a5fa],
          sticks: 0x22d3ee,
        },
      };
    },
    [deviceProfile.lowPower]
  );

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = resumePdf;
    link.download = "Utsav_Raj_Resume.pdf";
    link.click();
  };

  return (
    <div className="app-shell">
      <motion.div className="scroll-progress" style={{ scaleX }} />

      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-mark">UR</span>
          <span>Utsav Raj</span>
        </a>

        <button className="mobile-toggle" onClick={() => setMobileOpen((value) => !value)}>
          <span />
          <span />
        </button>

        <nav className={`nav-links ${mobileOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-backdrop" />
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-a" />
          <div className="hero-orb hero-orb-b" />

          <div className="hero-background">
            {/* Load the WebGL background lazily so the first paint stays light on mobile. */}
            <Suspense fallback={<div className="hero-background-fallback" aria-hidden="true" />}>
              <Hyperspeed effectOptions={heroEffectOptions} />
            </Suspense>
          </div>

          <div className="hero-overlay" />

          <div className="hero-content">
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: deviceProfile.isMobile ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: deviceProfile.isMobile ? 0.3 : 0.7 }}
            >
              <FaLocationArrow />
              <span>Available for opportunities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: deviceProfile.isMobile ? 0 : 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: deviceProfile.isMobile ? 0.3 : 0.8, delay: deviceProfile.isMobile ? 0 : 0.1 }}
            >
              Utsav Raj
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: deviceProfile.isMobile ? 0 : 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: deviceProfile.isMobile ? 0.3 : 0.7, delay: deviceProfile.isMobile ? 0 : 0.2 }}
            >
              Full Stack Developer | Cloud Computing Student
            </motion.p>

            <TypingLine words={heroLines} />

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: deviceProfile.isMobile ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: deviceProfile.isMobile ? 0.3 : 0.7, delay: deviceProfile.isMobile ? 0 : 0.35 }}
            >
              <a className="btn btn-primary" href="#projects">
                View Projects <FaArrowRight />
              </a>
              <button className="btn btn-secondary" onClick={downloadResume}>
                Download Resume <FaDownload />
              </button>
            </motion.div>

            <motion.div
              className="social-row"
              initial={{ opacity: 0, y: deviceProfile.isMobile ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: deviceProfile.isMobile ? 0.3 : 0.7, delay: deviceProfile.isMobile ? 0 : 0.45 }}
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                    <Icon />
                  </a>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section id="about" className="section section-alt">
          <SectionHeading
            kicker="About"
            title="A futuristic builder with a sharp eye for detail"
            description="I design and build premium frontend experiences with motion, structure, and a strong product mindset."
          />

          <div className="about-grid">
            <motion.div
              className="glass-card about-card"
              initial={{ opacity: 0, x: deviceProfile.isMobile ? 0 : -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: deviceProfile.isMobile ? 0.3 : 0.7 }}
            >
              <p>
                I focus on building interfaces that feel cinematic, but still remain clean, fast, and usable on every screen size.
                My work blends modern React, scalable component patterns, and a visual style that feels premium.
              </p>
              <div className="mini-stats">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="glass-card about-side"
              initial={{ opacity: 0, x: deviceProfile.isMobile ? 0 : 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: deviceProfile.isMobile ? 0.3 : 0.7 }}
            >
              <div className="about-list">
                <div>
                  <FaCode />
                  <span>Frontend architecture and motion systems</span>
                </div>
                <div>
                  <FaServer />
                  <span>Full stack apps with practical API design</span>
                </div>
                <div>
                  <FaCloud />
                  <span>Cloud-ready thinking and deployment awareness</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="skills" className="section">
          <SectionHeading
            kicker="Skills"
            title="Core technologies"
            description="A concise stack built for modern portfolio, product, and cloud-focused work."
          />

          <div className="skills-grid">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <motion.article
                  key={skill.name}
                  className={`skill-card ${skill.tone}`}
                  whileHover={deviceProfile.canHover ? { y: -4, scale: 1.01 } : undefined}
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                >
                  <Icon />
                  <h3>{skill.name}</h3>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="projects" className="section section-alt">
          <SectionHeading
            kicker="Projects"
            title="Selected builds"
            description="Featured products and concepts with strong UI storytelling, tech clarity, and hover-driven polish."
          />

          <div className="projects-grid">
            {projects.map((project) => (
              <motion.article
                key={project.name}
                className="project-card glass-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={deviceProfile.canHover ? { y: -5 } : undefined}
              >
                <div className="project-image-wrap">
                  <img src={project.image} alt={project.name} loading="lazy" decoding="async" />
                  <div className="project-image-overlay" />
                </div>
                <div className="project-content">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="tech-badges">
                    {project.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <FaGithub /> GitHub
                    </a>
                    <a href={project.live} target="_blank" rel="noreferrer">
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <SectionHeading
            kicker="Experience"
            title="Professional timeline"
            description="A concise view of my current direction, combining frontend craftsmanship with cloud-minded learning."
          />

          <div className="timeline">
            {experience.map((item) => (
              <motion.article
                key={item.title}
                className="timeline-card glass-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <span className="timeline-period">{item.period}</span>
                <h3>{item.title}</h3>
                <strong>{item.org}</strong>
                <p>{item.details}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="certifications" className="section section-alt">
          <SectionHeading
            kicker="Certifications"
            title="Learning milestones"
            description="Formal and self-directed learning that supports modern frontend and cloud work."
          />

          <div className="cert-grid">
            {certifications.map((cert) => (
              <motion.div
                key={cert}
                className="glass-card cert-card"
                whileHover={deviceProfile.canHover ? { y: -6 } : undefined}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <FaAward />
                <span>{cert}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHeading
            kicker="GitHub Stats"
            title="Live ecosystem snapshot"
            description="A compact stats panel that complements the portfolio with a developer-first presence."
          />

          <div className="github-grid">
            <div className="glass-card github-card">
              <img
                src="https://github-readme-stats.vercel.app/api?username=utsav-18&show_icons=true&theme=tokyonight&hide_border=true&count_private=true"
                alt="GitHub stats"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="glass-card github-card">
              <img
                src="https://github-readme-streak-stats.herokuapp.com/?user=utsav-18&theme=tokyonight&hide_border=true"
                alt="GitHub streak stats"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section id="contact" className="section section-alt">
          <SectionHeading
            kicker="Contact"
            title="Let’s build something premium"
            description="If you’re looking for a modern React developer who cares about polish, motion, and clarity, reach out."
          />

          <div className="contact-grid">
            <motion.div
              className="glass-card contact-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <h3>Start a conversation</h3>
              <p>
                I’m open to internships, freelance builds, product landing pages, and modern full stack interfaces.
              </p>
              <div className="contact-actions">
                <a className="btn btn-primary" href="mailto:utsav@example.com">
                  <FaEnvelope /> Email Me
                </a>
                <a className="btn btn-secondary" href="https://github.com/" target="_blank" rel="noreferrer">
                  <FaGithub /> GitHub Profile
                </a>
              </div>
            </motion.div>

            <motion.div
              className="glass-card contact-card contact-meta"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <div>
                <span>Email</span>
                <strong>utsav@example.com</strong>
              </div>
              <div>
                <span>Location</span>
                <strong>India</strong>
              </div>
              <div>
                <span>Focus</span>
                <strong>React, Motion, Cloud</strong>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Utsav Raj. Built with React, Framer Motion, and Hyperspeed.</p>
        <a href="#home">Back to top</a>
      </footer>
    </div>
  );
}

export default App;


