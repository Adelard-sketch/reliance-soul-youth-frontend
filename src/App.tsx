import { Suspense, useState, useEffect, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./Components/Navbar";
import ErrorBoundary from "./Components/ErrorBoundary";
import Footer from "./Components/Footer";
import LoadingSpinner from "./Components/LoadingSpinner";

// Lazy load pages for better performance
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Gallery = lazy(() => import("./Pages/Gallery"));
const Team = lazy(() => import("./Pages/Team"));
const BookStudio = lazy(() => import("./Pages/BookStudio"));
const Stories = lazy(() => import("./Pages/Stories"));
const Contact = lazy(() => import("./Pages/Contact"));
const Donate = lazy(() => import("./Pages/Donate"));
const FAQ = lazy(() => import("./Pages/FAQ"));
const Login = lazy(() => import("./Pages/Login"));
const Admin = lazy(() => import("./Pages/Admin"));

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  useEffect(() => {
    const handleAuthChanged = () => setToken(localStorage.getItem("token"));
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "token") setToken(localStorage.getItem("token"));
    };

    window.addEventListener("authChanged", handleAuthChanged);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("authChanged", handleAuthChanged);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <div className="app-root">
          <ScrollToTop />
          <Navbar />
          <main className="main-container">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/team" element={<Team />} />
              <Route path="/book-studio" element={<BookStudio />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/login" element={<Login />} />
              {/* allow /admin/login to land on the login page */}
              <Route path="/admin/login" element={<Navigate to="/login" replace />} />
              <Route
                path="/admin"
                element={token ? <Admin /> : <Navigate to="/login" replace />}
              />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
