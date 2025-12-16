  import React, { useState } from "react";
  import "./Team.css";

  // === IMAGES ===
  import gloria from "../assets/Gloria3.jpg";
  import sonia from "../assets/sonia.jpg";
  import clara from "../assets/clara.png";
  import adel from "../assets/adelard_ceo.png";
  import naomi from "../assets/naomi.png";
  import jp from "../assets/jpOr.png";
  import joseph from "../assets/joseph.png";
  import daima from "../assets/daima.jpg";
  import aimable from "../assets/aimable.png"; 
  import gentil from "../assets/gentil.png";  
  import estherDechy from "../assets/estherDechy.png"; 
  import mayalaJoyce from "../assets/joyceMayala.jpg"; 
  import elieMagambo from "../assets/elieProfile.jpg";
  import blaise from "../assets/blaiseProfile.jpg";
  import anuani from "../assets/anuani.jpg";  
  import chadrack from "../assets/chadrack.jpg";  
  import jetty from "../assets/jetty.png";  



  import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaTiktok,
    FaEnvelope,
  } from "react-icons/fa";

  /* ------------------------------
    TypeScript Interfaces
  ------------------------------ */
  interface SocialLinksType {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    email?: string;
    tiktok?: string;
  }

  interface TeamMember {
    name: string;
    title: string;
    bio: string;
    image: string;
    social: SocialLinksType;
  }

  interface Volunteer {
    name: string;
    department: string;
    image: string;
  }

  /* ------------------------------
    Social Media Links
  ------------------------------ */
  const SocialLinks: React.FC<{ links: SocialLinksType }> = ({ links }) => (
    <div className="social-links">
      {links.facebook && (
        <a href={links.facebook} target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
      )}
      {links.twitter && (
        <a href={links.twitter} target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
      )}
      {links.linkedin && (
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </a>
      )}
      {links.instagram && (
        <a href={links.instagram} target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      )}
      {links.email && (
        <a href={`mailto:${links.email}`} target="_blank" rel="noopener noreferrer">
          <FaEnvelope />
        </a>
      )}
      {links.tiktok && (
        <a href={links.tiktok} target="_blank" rel="noopener noreferrer">
          <FaTiktok />
        </a>
      )}
    </div>
  );

/* ------------------------------
   Team Card (Board & Executive)
------------------------------ */
const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [showBio, setShowBio] = useState(false);

  return (
    <div className="team-card" onClick={() => setShowBio(!showBio)}>
      <img src={member.image} alt={member.name} className="team-image" />
      <div className="team-info">
        <h3>{member.name}</h3>
        <p className="team-title">{member.title}</p>
        <SocialLinks links={member.social} />
        {showBio && <p className="team-bio">{member.bio}</p>}
      </div>
    </div>
  );
};

/* ------------------------------
   Volunteer Card (Simple)
------------------------------ */
const VolunteerCard: React.FC<{ volunteer: Volunteer }> = ({ volunteer }) => (
  <div className="volunteer-card">
    <img src={volunteer.image} alt={volunteer.name} className="volunteer-img" />
    <div className="volunteer-info">
      <h3>{volunteer.name}</h3>
      <p>{volunteer.department}</p>
    </div>
  </div>
);

/* ------------------------------
   Section Template
------------------------------ */
const TeamSection: React.FC<{ title: string; members: TeamMember[] }> = ({ title, members }) => (
  <section className="section">
    <h2 className="section-title">{title}</h2>
    <div className="team-grid">
      {members.map((member, index) => (
        <TeamCard member={member} key={index} />
      ))}
    </div>
  </section>
);

const VolunteerSection: React.FC<{ volunteers: Volunteer[] }> = ({ volunteers }) => (
  <section className="section volunteer-section">
    <h2 className="section-title">Volunteers</h2>
    <div className="volunteer-grid">
      {volunteers.map((volunteer, index) => (
        <VolunteerCard volunteer={volunteer} key={index} />
      ))}
    </div>
  </section>
);

  /* ------------------------------
    Team Members Data
  ------------------------------ */
  const teamMembers = {
    board: [
          {
        name: "Blaise Muhume",
        title: "Board Chair",
        bio: "With a background in Business Administration at Andrews University (USA), Neema is passionate about developing sustainable livelihoods across Africa.",
        image: blaise,
        social: { linkedin: "", instagram: "https://www.instagram.com/blaisemuhune/", email: "" },
      },
      {
        name: "Neema G. Wereje",
        title: "Board member",
        bio: "With a background in Business Administration at Andrews University (USA), Neema is passionate about developing sustainable livelihoods across Africa.",
        image: gloria,
        social: { linkedin: "https://www.linkedin.com/in/neema-wereje-074013272/", instagram: "https://www.instagram.com/neema_gloria/", email: "neemagloria14@gmail.com" },
      },
      {
        name: "Borauzima H. Adelard",
        title: "Board Member",
        bio: "Passionate about community growth, global citizenship, and computer science.",
        image: adel,
        social: { linkedin: "https://www.linkedin.com/in/borauzima-adelard-a6875b2ab/", facebook: "https://www.facebook.com/adelard.hnz/", instagram: "https://www.instagram.com/a.d.e.l_hnz/", email: "adelborauzima@gmail.com", tiktok: "https://www.tiktok.com/@adel_mic?lang=en" },
      },
      {
        name: "Esther Dechy",
        title: "Board Member",
        bio: "Dedicated to youth empowerment and leadership transformation.",
        image: estherDechy,
        social: { facebook: "https://www.facebook.com/esther.dechy", linkedin: "https://www.linkedin.com/in/esther-dechy-811013234/", instagram: "https://www.instagram.com/essydechy/" },
      },
          {
        name: "Elie Magambo",
        title: "Board member",
        bio: "With a background in Business Administration at Andrews University (USA), Neema is passionate about developing sustainable livelihoods across Africa.",
        image: elieMagambo,
        social: { linkedin: "", instagram:"", email: "" },
      },
       {
        name: "Chadrack Ndamiye",
        title: "Board member",
        bio: "With a background in Business Administration at Andrews University (USA), Neema is passionate about developing sustainable livelihoods across Africa.",
        image: chadrack,
        social: { linkedin: "", instagram:"", email: "" },
      },
    ],
    executive: [
      {
        name: "Adelard Borauzima",
        title: "Chief Executive Officer",
        bio: "Guides the organization with vision and strategy.",
        image: adel,
        social: { linkedin: "https://www.linkedin.com/in/borauzima-adelard-a6875b2ab/", facebook: "https://www.facebook.com/adelard.hnz/", instagram: "https://www.instagram.com/a.d.e.l_hnz/", email: "adelborauzima@gmail.com", tiktok: "https://www.tiktok.com/@adel_mic?lang=en" },
      },
      {
        name: "Sonia Glorone",
        title: "Chief Finance Officer",
        bio: "Manages financial planning and operations.",
        image: sonia,
        social: { linkedin: "https://www.linkedin.com/in/sonia-glorone-2405a0384/", facebook: "https://www.facebook.com/profile.php?id=61581538287788" },
      },
      {
        name: "Daima Nyamusuma",
        title: "Creative Programs Director",
        bio: "Committed to providing artistic programs to empower young people.",
        image: daima,
        social: { facebook: "https://www.facebook.com/diams.nyamusuma.3", email: "daimadavid90@gmail.com" },
      },
      {
        name: "Naomi Aluel Ateng Magot",
        title: "Grants and Donor Relations",
        bio: "Oversees partnerships and donor engagement.",
        image: naomi,
        social: { linkedin: "https://www.linkedin.com/in/naomi-aluel-ateng-23b217363/", facebook: "https://www.facebook.com/amer.achut" },
      },
      {
        name: "Jean-Paul Prospere",
        title: "Director of Sustainable Programs",
        bio: "Leads income-generating activities for the foundation long-term growth.",
        image: jp,
        social: { facebook: "https://www.facebook.com/amisi.jeanpaul.5", email: "chantalprospere224@gmail.com" },
      },
      {
        name: "Joseph Masirika",
        title: "Director of Communications and Media",
        bio: "Responsible for RSYI’s communication and media strategy.",
        image: joseph,
        social: { instagram: "https://www.instagram.com/mr_volcano10/", facebook: "https://www.facebook.com/joseph.masirika.92", tiktok: "https://www.tiktok.com/@mr_volcano10?lang=en", email: "fungulomasirika8@gmail.com" },
      },
    ],
    volunteers: [
      {
        name: "Aimable Ngendero",
        department: "Sustainable Programs",
        image: aimable,
      },
      {
        name: "Clarice Ntabala",
        department: "Finance Department",
        image: clara,
      },
      {
        name: "G. Gentil",
        department: "Creative Department",
        image: gentil,
      },
      {
        name: "Mayala Joyce",
        department: "Grants and Donor Relations",
        image: mayalaJoyce,
      },
      {
        name: "Anuani Fidel",
        department: "Creative Department",
        image: anuani,
      },
       {
        name: "Jetty Petter",
        department: "Finance Department",
        image: jetty,
      },
    ],
  };

  /* ------------------------------
    Main Component
  ------------------------------ */
  const Team = () => (
    <div className="main-container">
      <TeamSection title="Board Members" members={teamMembers.board} />
      <TeamSection title="Executive Committee" members={teamMembers.executive} />
      <VolunteerSection volunteers={teamMembers.volunteers} />
    </div>
  );
  export default Team;

