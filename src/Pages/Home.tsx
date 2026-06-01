import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.css";

// === Optimized Background Loading ===
import bg1 from "../assets/artistic1.jpeg";
import bg9 from "../assets/elili_Sing.jpg";

// Lazy load other backgrounds after initial render
const lazyBackgrounds = [
  () => import("../assets/love1.mp4"),
  () => import("../assets/artistic2.jpeg"),
  () => import("../assets/rsy_melody1.jpg"),
  () => import("../assets/rsy_melody2.jpg"),
  () => import("../assets/rsyGoma.jpg"),
  () => import("../assets/artistic6.jpeg"),
  () => import("../assets/culturalDance.jpg"),
];

// Initial backgrounds for fast loading
const initialBackgrounds = [
  { src: bg1, type: "image" },
  { src: bg9, type: "image" },
];

// === Programs ===
import musicImg from "../assets/Talent.jpg";
import danceImg from "../assets/culturalDance.jpg";
import designImg from "../assets/designtop.jpg";

const programs = [
  {
    img: musicImg,
    title: "Music Workshops",
    desc: "Sessions focused on performance, song composition, instruments, and production basics.",
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
import design from "../assets/design1.jpg";

// === Future Vision ===
import dream1 from "../assets/dream1.jpg";
import dream2 from "../assets/dream2.jpg";
import dream3 from "../assets/relianceCenter.jpeg";
import dream4 from "../assets/dream4.jpg";



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
    title: "Art for Healing Center",
    desc: "Using art and creativity to support emotional healing and wellbeing.",
  },
  {
    img: design,
    type: "image",
    title: "Skill Building Programs",
    desc: "Empowerment in fashion design, pencil portrait, and artisan skill-building for youth empowerment.",
  },
];

// === Future Vision Images ===
const visionImages = [dream1, dream2, dream3, dream4];

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
      const handleLoad = () => {
        img.onload = null;
        img.onerror = null;
        resolve();
      };
      img.onload = handleLoad;
      img.onerror = handleLoad;
      img.src = src;
    } else if (type === "video") {
      const video = document.createElement("video");
      video.preload = "metadata";
      const handleLoad = () => {
        video.oncanplaythrough = null;
        video.onerror = null;
        video.src = ""; 
        resolve();
      };
      video.oncanplaythrough = handleLoad;
      video.onerror = handleLoad;
      video.src = src;
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

const VisionCard = ({ img, index }: any) => (
  <motion.article
    className="vision-card"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 220 }}
  >
    <img src={img} alt={`Vision ${index + 1}`} className="vision-img" />
  </motion.article>
);

// === MAIN COMPONENT ===
export default function Home() {
  const [index, setIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [backgrounds, setBackgrounds] = useState(initialBackgrounds);
  const [allBackgroundsLoaded, setAllBackgroundsLoaded] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load first background immediately
  useEffect(() => {
    const loadFirst = async () => {
      const first = initialBackgrounds[0];
      await preloadMedia(first.src, first.type);
      setIsReady(true);
    };
    loadFirst();
  }, []);

  // Load additional backgrounds after initial render
  useEffect(() => {
    if (!isReady) return;
    
    const loadAdditionalBackgrounds = async () => {
      try {
        // Load additional backgrounds progressively
        const additionalBgs = await Promise.all([
          import("../assets/love1.mp4").then(m => ({ src: m.default, type: "video" })),
          import("../assets/artistic2.jpeg").then(m => ({ src: m.default, type: "image" })),
          import("../assets/rsy_melody1.jpg").then(m => ({ src: m.default, type: "image" })),
          import("../assets/rsy_melody2.jpg").then(m => ({ src: m.default, type: "image" })),
          import("../assets/rsyGoma.jpg").then(m => ({ src: m.default, type: "image" })),
          import("../assets/artistic6.jpeg").then(m => ({ src: m.default, type: "image" })),
          import("../assets/culturalDance.jpg").then(m => ({ src: m.default, type: "image" })),
        ]);
        
        setBackgrounds([...initialBackgrounds, ...additionalBgs]);
        setAllBackgroundsLoaded(true);
      } catch (error) {
        console.warn('Some backgrounds failed to load:', error);
        setAllBackgroundsLoaded(true);
      }
    };

    // Delay loading additional backgrounds
    const timer = setTimeout(loadAdditionalBackgrounds, 2000);
    return () => clearTimeout(timer);
  }, [isReady]);

  // Background rotation with faster timing for video
  useEffect(() => {
    if (!isReady || !allBackgroundsLoaded) return;
    
    const getRotationTime = () => {
      const current = backgrounds[index % backgrounds.length];
      // Show video for only 4 seconds, images for 7 seconds
      return current?.type === "video" ? 4000 : 7000;
    };
    
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % backgrounds.length),
      getRotationTime()
    );
    return () => clearTimeout(timer);
  }, [isReady, allBackgroundsLoaded, backgrounds.length, index]);

  if (!isReady) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const current = backgrounds[index % backgrounds.length];

  return (
    <div className="home-page">
      <Helmet>
        <title>Reliance Soul International Youth Foundation | Empowering Youth Through Arts & Culture</title>
        <meta name="description" content="Reliance Soul International Youth Foundation empowers young people through arts, culture, and creative expression. Join our community, book studio sessions, and support our mission." />
        <meta property="og:title" content="Reliance Soul International Youth Foundation | Empowering Youth Through Arts & Culture" />
        <meta property="og:description" content="Empowering young people through arts, culture, and creative expression. Join our community and support our mission." />
        <meta property="og:url" content="https://www.reliancesoulfdn.org/" />
        <meta property="og:image" content="https://www.reliancesoulfdn.org/src/assets/reliance_logo.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.reliancesoulfdn.org/" />
      </Helmet>
      
      {/* === Background Rotator === */}
      <div className="background-wrapper" aria-hidden="true">
        <AnimatePresence>
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
              transition={{ duration: 0.8, ease: "easeInOut" }}
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
              transition={{ duration: 0.8, ease: "easeInOut" }}
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
          Hands-on sessions in creative industry music, dance, and design for all ages.
        </p>
        <div className="grid">
          {programs.map((p, i) => (
            <ProgramCard key={i} {...p} />
          ))}
        </div>
      </motion.section>
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

      {/* === FUTURE VISION === */}
      <motion.section
        className="section vision"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="section-title">The Reliance Artistic Center Dream</h2>
        <div className="vision-grid">
          {visionImages.map((img, i) => (
            <VisionCard key={i} img={img} index={i} />
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
        <h3 className="cta-title">Join us _ Be part of us</h3>
        <div className="hero-buttons">
          <Link to="/donate" className="btn-primary small">
            Donate
          </Link>
          <Link to="/book-studio" className="btn-secondary small">
            Book Studio
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
