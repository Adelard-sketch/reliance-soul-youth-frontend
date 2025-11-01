import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./Stories.css";

// === Story participant images ===
import neemaThen from "../assets/gloriaBefore.jpg";
import neemaNow from "../assets/Gloria2.jpg";
import adelThen from "../assets/adel2.jpg";
import adelNow from "../assets/adel3.jpg";

const stories = [
  {
    name: "Neema Gloria Wereje",
    thenImg: neemaThen,
    nowImg: neemaNow,
    bio: `I was born and raised in Uganda where my parents fled due to conflict. Growing up as a refugee in poverty shaped my passion for advocating for those without a voice. My purpose is clear: to uplift marginalized communities and create opportunities for the less fortunate to overcome poverty.
    
In December 2020, while visiting my home country DRC, I was deeply moved by the talent and potential of young people performing in the community. Despite the hardships they faced, they expressed their creativity through art and music. This experience inspired me to create an initiative that could harness the talents of Congolese refugees and use those skills to build a better future. Along with my co-founder Adelard Borauzima, we launched the Reliance Soul Youth Initiative (RSYI). Our goal is to reduce poverty by empowering marginalized communities through various programs focused on art, music, education, and entrepreneurship to achieve financial independence and create sustainable livelihoods. RSYI is not just about providing aid; it’s about fostering self-reliance and giving these individuals the tools to transform their own lives.

I credit my achievements to God’s grace and strive to foster self-reliant, stronger future generations. I enjoy connecting with others, learning from their experiences, and applying those lessons where needed.`,
    impact:
      "“Art gave me a voice when I thought I had none. Now I mentor other young people to use creativity for positive change.”",
  },
  {
    name: "Adelard Hanzira Borauzima",
    thenImg: adelThen,
    nowImg: adelNow,
    bio: `As an internally displaced person at a younger age and later became a refugee in Uganda; music has been my lifeline, a source of strength and healing during the hardest moments of my life. 
    This personal journey inspired me to create the Reliance Soul Youth Initiative. 
    I aspire to offer other displaced children and refugee youth the same opportunity to find hope and self-reliance through music, arts, and vocational skill empowering them to rebuild their lives and pursue their dreams.`,
    impact:
      "“Giving back is an absolute joy. Now I teach others to let their heartbeat guide their purpose.”",
  },
 
];

const Stories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="stories-page">
      {/* === Hero Section (Static Background) === */}
      <section className="stories-hero">
        <div className="overlay">
          <h1>Stories of Resilience</h1>
          <p>
            Voices of young refugees and displaced youth who turned their pain
            into power through creativity, courage, and community.
          </p>
        </div>
      </section>

      {/* === Stories Section === */}
      <section className="stories-list">
        {stories.map((story, index) => (
          <motion.div
            key={index}
            className={`story-block ${index % 2 === 1 ? "reverse" : ""}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="story-images">
              <div className="photo-pair">
                <div className="photo">
                  <img src={story.thenImg} alt={`${story.name} then`} />
                 
                </div>
                <div className="photo">
                  <img src={story.nowImg} alt={`${story.name} now`} />
                  
                </div>
              </div>
            </div>

            <div className="story-content">
              <h2>{story.name}</h2>
              <p className="bio">{story.bio}</p>
              <p className="impact">{story.impact}</p>
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
};

export default Stories;
