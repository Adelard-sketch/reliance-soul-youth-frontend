import React, { useState } from "react";
import "./About.css";
import heroImage from "../assets/rsyGoma.jpg";
import journeyImage from "../assets/Elili1.jpg";
import artImage from "../assets/rsy2.jpg";

const About = () => {
  const [darkMode, setDarkMode] = useState(false);

  const videos = [
    {
      id: "RL5pIYRwQlU",
      title: "Danger by Reliance Melody",
      description:
        "The song delivers a powerful message about the urgent threats of climate change, emphasizing that time is running out to act. It calls for collective responsibility, inspiring listeners to join global efforts to protect the planet and prevent environmental disaster.",
    },
    {
      id: "OGxjZLsJc9A",
      title: "Let's Love by Reliance Melody",
      description:
        "This piece calls for all of us to come together, showing love through actions that promote peace, justice, and sustainability. It reminds us that by caring for each other and our planet, we can fight violence, prevent conflict, and work toward a better future for everyone.",
    },
    {
      id: "Jz1DgnZ_JQQ",
      title: "Don't Cry Reliance Melody",
      description:
        "In moments of conflict, pain, and uncertainty, Don’t Cry by Reliance Melody is a reminder that light still exists. This emotional piece blends heartfelt melodies with a message of strength, healing, and resilience. It encourages listeners to find hope and courage even in the darkest times.",
    },
  ];

  return (
    <div className={`about-container ${darkMode ? "dark-mode" : ""}`}>
      {/* === Dark Mode Toggle === */}
      <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* === Hero Section === */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="about-overlay">
          <h1 className="about-title">About Us</h1>
          <p className="about-subtitle">
            At <strong>Reliance Soul Youth International Foundation</strong>, we
            use the power of art, music, and storytelling to heal, transform
            lives, and build a future where every young person from marginalized
            communities can thrive creatively and confidently.
          </p>
        </div>
      </section>

      {/* === Our Journey Section === */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>Our Journey</h2>
            <p>
              The <strong>Reliance Soul Youth International Foundation</strong>{" "}
              began with a simple yet powerful idea — that art can be more than
              expression; it can be a force for healing, empowerment, and
              transformation.
            </p>
            <p>
              From community stages to refugee settlements, we have seen how
              creativity can spark hope, rebuild confidence, and unite people
              across different backgrounds.
            </p>
            <p>
              Our journey continues as we empower youth through creative
              programs, workshops, and projects that promote peace, innovation,
              and storytelling.
            </p>
          </div>
          <div className="about-image vertical">
            <img
              src={journeyImage}
              alt="RSYI team facilitating a creative workshop"
            />
          </div>
        </div>
      </section>

      {/* === Vision, Mission & Values Section === */}
      <section className="about-section vision-mission">
        <h2>Our Vision, Mission & Values</h2>
        <div className="vmv-grid">
          <div className="vmv-card">
            <h3>🌍 Vision</h3>
            <p>
              Reached, Touched, and Changed marginalized souls for freedom and selfreliance.
            </p>
          </div>

          <div className="vmv-card">
            <h3>🎯 Mission</h3>
            <p>
              To empower young refugees and marginalized individuals through arts, cultural
              expression, vocational skills, and psychosocial support, fostering healing, 
              leadership, and sustainable livelihoods.
            </p>
          </div>

          <div className="vmv-card">
            <h3>💫 Core Values</h3>
            <ul>
              <li><strong>Creativity</strong> — We innovate and inspire through art.</li>
              <li><strong>Empathy</strong> — We listen, connect, and uplift.</li>
              <li><strong>Integrity</strong> — We act with honesty and purpose.</li>
              <li><strong>Community</strong> — We grow stronger together.</li>
              <li><strong>Resilience</strong> — We turn challenges into strength.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* === Art & Impact Section === */}
      <section className="about-section">
        <div className="about-content reverse">
          <div className="about-text">
            <h2>Art that Transforms Lives</h2>
            <p>
              We believe in the transformative power of art — not just as a
              performance, but as a tool for connection, healing, and growth.
            </p>
            <p>
              Through dance, spoken word, and music, we give young people a
              platform to share their truth and reimagine their world. Every
              piece of art created in our spaces is a story of resilience and
              rebirth.
            </p>
            <p>
              As we grow, we remain committed to using creativity as a bridge
              between potential and opportunity — nurturing the next generation
              of changemakers.
            </p>
          </div>
          <div className="about-image vertical">
            <img src={artImage} alt="Youth performing at an RSYI event" />
          </div>
        </div>
      </section>

      {/* === YouTube Work Showcase === */}
      <section className="about-section work-section">
        <h2 className="section-title">Our Creative Work</h2>
        <p className="section-subtitle">
          Explore our visual storytelling — a celebration of creativity,
          resilience, and community. Watch more on our{" "}
          <a
            href="https://www.youtube.com/@RelianceSoulYouthInitiative?reload=9"
            target="_blank"
            rel="noopener noreferrer"
            className="youtube-link"
          >
            YouTube Channel
          </a>
          .
        </p>

        <div className="video-gallery">
          {videos.map((video, index) => (
            <div key={index} className="video-card">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allowFullScreen
              ></iframe>
              <div className="video-info">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
