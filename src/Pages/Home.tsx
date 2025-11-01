import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.css";

// === Backgrounds ===
import bg1 from "../assets/rsyGoma.jpg";
import bg2 from "../assets/love1.mp4";
import bg3 from "../assets/nature.mp4";
import bg4 from "../assets/design1.jpg";
import bg5 from "../assets/short3.mp4";
import bg6 from "../assets/rsy_melody1.jpg";
import bg7 from "../assets/danceShort.mp4";
import bg8 from "../assets/rsy_melody2.jpg";

const backgrounds = [
  { src: bg1, type: "image" },
  { src: bg2, type: "video" },
  { src: bg3, type: "video" },
  { src: bg4, type: "image" },
  { src: bg5, type: "video" },
  { src: bg6, type: "image" },
  { src: bg7, type: "video" },
  { src: bg8, type: "image" },
];

// === Programs ===
import musicImg from "../assets/Talent.jpg";
import danceImg from "../assets/dance.jpg";
import designImg from "../assets/designtop.jpg";

const programs = [
  {
    img: musicImg,
    title: "Music Workshops",
    desc: "Group & 1:1 sessions focused on performance, song composition, instruments, and production basics.",
  },
  {
    img: danceImg,
    title: "Dance Classes",
    desc: "Movement, choreography, and confidence-building sessions for all levels.",
  },
  {
    img: designImg,
    title: "Portraits Design & Crafts",
    desc: "Practical design sessions — visuals, crafts, and digital creativity.",
  },
];

// === Partners ===
import partner1 from "../assets/ciyotaofficial_logo.jpeg";
import partner2 from "../assets/LoveAfrica.jpeg";
import partner3 from "../assets/Globalmissions.png";
import partner4 from "../assets/maisondejeune.png";
import partner5 from "../assets/kuelimika.png";

const partners = [partner1, partner2, partner3, partner4, partner5];

// === Projects ===
import choirImg from "../assets/Choir.mp4";
import healingImg from "../assets/house3.jpg";
import dance from "../assets/Cultural_dance.jpg";
import design from "../assets/design1.jpg";

const projects = [
  {
    img: choirImg,
    type: "video",
    title: "Community Music Initiative",
    desc: "Empowering voices together for unity, learning, and cultural expression.",
  },
  {
    img: healingImg,
    type: "image",
    title: "Art for Healing Program",
    desc: "Using art and creativity to support emotional healing and wellbeing.",
  },
  {
    img: dance,
    type: "image",
    title: "Body Movement",
    desc: "Using dance for healing, social cohesion, and cultural empowerment.",
  },
  {
    img: design,
    type: "image",
    title: "Skill Building Programs",
    desc: "Empowerment in fashion design, pencil portrait, and artisan skill-building for youth empowerment.",
  },
];

// === Animation Variants ===
const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

// === Helper Function ===
const preloadMedia = (src: string, type: string) =>
  new Promise<void>((resolve) => {
    if (type === "image") {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => resolve();
    } else if (type === "video") {
      const video = document.createElement("video");
      video.src = src;
      video.preload = "auto";
      video.oncanplaythrough = () => resolve();
      video.onerror = () => resolve();
    } else {
      resolve();
    }
  });

// === Reusable Components ===
const ProgramCard = ({ img, title, desc }: any) => (
  <motion.article
    className="card"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 220 }}
  >
    <img src={img} alt={title} className="program-img" />
    <h3>{title}</h3>
    <p>{desc}</p>
  </motion.article>
);

const ProjectCard = ({ img, title, desc, type }: any) => (
  <motion.article
    className="project-card"
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 180 }}
  >
    {type === "video" ? (
      <video src={img} className="project-img" autoPlay muted loop playsInline />
    ) : (
      <img src={img} alt={title} className="project-img" />
    )}
    <div className="project-info">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  </motion.article>
);

// === MAIN COMPONENT ===
export default function Home() {
  const [index, setIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // ✅ Preload first background
  useEffect(() => {
    const loadFirst = async () => {
      const first = backgrounds[0];
      await preloadMedia(first.src, first.type);
      setIsReady(true);
    };
    loadFirst();
  }, []);

  // ✅ Rotate backgrounds after preload
  useEffect(() => {
    if (!isReady) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % backgrounds.length),
      7000
    );
    return () => clearInterval(timer);
  }, [isReady]);

  if (!isReady) {
    return (
      <div className="loading-screen">
        <p>Loading visuals...</p>
      </div>
    );
  }

  const current = backgrounds[index];

  return (
    <div className="home-page">
      {/* === Background Rotator === */}
      <div className="background-wrapper" aria-hidden="true">
        <AnimatePresence mode="wait">
          {current.type === "video" ? (
            <motion.video
              key={current.src}
              src={current.src}
              className="background-media"
              autoPlay
              muted
              loop
              playsInline
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            />
          ) : (
            <motion.img
              key={current.src}
              src={current.src}
              alt="Background visual"
              className="background-media"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
            />
          )}
        </AnimatePresence>
        <div className="background-overlay" />
      </div>

      {/* === HERO === */}
      <header className="hero" role="banner">
        <motion.h1
          className="hero-title"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          My Talent My Future
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <strong>• Healing • Empowerment • Advocacy</strong>
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/contact" className="btn-primary">
            Partner With Us
          </Link>
          {/* ✅ FIXED: this route must match App.tsx */}
          <Link to="/book-studio" className="btn-secondary">
            Book Session
          </Link>
        </motion.div>
      </header>

      {/* === PROGRAMS === */}
      <motion.section
        className="section programs"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="section-title">Our Artistic Programs</h2>
        <p className="section-subtitle">
          Hands-on sessions in creative industry — music, dance, and design for all ages.
        </p>
        <div className="grid">
          {programs.map((p, i) => (
            <ProgramCard key={i} {...p} />
          ))}
        </div>
      </motion.section>

      {/* === PARTNERS === */}
      <motion.section
        className="section partnerships section--compact"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="section-title">Our Partners</h2>
        <div className="partners-marquee">
          <div className="partners-track">
            {[...partners, ...partners].map((p, i) => (
              <img key={i} src={p} alt={`Partner ${i + 1}`} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* === PROJECTS === */}
      <motion.section
        className="section projects"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="section-title">Ongoing Projects</h2>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} />
          ))}
        </div>
      </motion.section>

      {/* === CTA === */}
      <motion.section
        className="section cta section--compact"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="cta-title">Join us — Be part of us</h3>
        <div className="hero-buttons">
          <Link to="/donate" className="btn-primary small">
            Donate
          </Link>
          <Link to="/book-studio" className="btn-secondary small">
            Book Studio
          </Link>
        </div>
      </motion.section>

      {/* === FOOTER === */}
      <footer className="footer">
        © {new Date().getFullYear()} Reliance Soul International Youth Foundation —{" "}
        <Link to="/privacy" className="footer-link">
          Privacy
        </Link>
      </footer>
    </div>
  );
}
