import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaTiktok,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";
import Logo from "../assets/reliance_logo.jpg";
import "./NavBar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    setToken(!!userToken);
  }, []);

  // Automatically close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/");
  };

  // Navigation links
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/book-studio", label: "Book With Us" },
    { path: "/team", label: "Our Team" },
    { path: "/gallery", label: "Gallery" },
    { path: "/stories", label: "Stories" },
    { path: "/contact", label: "Contact" },
    ...(token ? [{ path: "/admin", label: "Admin" }] : []), // ✅ Only for logged-in admins
  ];

  const socialLinks = {
    facebook: "https://www.facebook.com/share/16CApxXZsK/?mibextid=wwXIfr",
    tiktok: "https://www.tiktok.com/@reliance_melody?lang=en",
    linkedin:
      "https://www.linkedin.com/posts/borauzima-adelard-a6875b2ab_sdgs-youthvoices-climateaction-activity-7353828504905338881-c5k_",
    instagram: "https://www.instagram.com/reliance_initiative/",
    email: "mailto:info@reliancesoulfdn.org",
  };

  return (
    <header className="navbar">
      <div className="navbar-center">
        {/* === Logo === */}
        <div
          className="navbar-logo"
          onClick={() => {
            navigate("/");
            closeMenu();
          }}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === "Enter" && navigate("/")}
        >
          <img src={Logo} alt="RSYI Logo" />
        </div>

        {/* === Desktop Nav === */}
        <nav className={`navbar-nav ${menuOpen ? "open" : ""}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* === Social Icons + Donate / Logout === */}
        <div className="navbar-actions">
          <div className="social-icons">
            <a href={socialLinks.facebook} target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href={socialLinks.tiktok} target="_blank" rel="noreferrer">
              <FaTiktok />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href={socialLinks.email}>
              <FaEnvelope />
            </a>
          </div>

          {token ? (
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <button
              className="donate-btn"
              onClick={() => {
                navigate("/donate");
                closeMenu();
              }}
            >
              Donate
            </button>
          )}
        </div>
      </div>

      {/* === Mobile Hamburger === */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* === Mobile Dropdown === */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}

          <div className="mobile-social">
            <a href={socialLinks.facebook} target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href={socialLinks.twitter} target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href={socialLinks.email}>
              <FaEnvelope />
            </a>
          </div>

          {token ? (
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <button
              className="donate-btn"
              onClick={() => {
                navigate("/donate");
                closeMenu();
              }}
            >
              Donate
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
