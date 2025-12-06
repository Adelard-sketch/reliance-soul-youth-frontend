import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ErrorBoundary from "./Components/ErrorBoundary";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Gallery from "./Pages/Gallery";
import Team from "./Pages/Team";
import BookStudio from "./Pages/BookStudio";
import Stories from "./Pages/Stories";
import Contact from "./Pages/Contact";
import Donate from "./Pages/Donate";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";

function App() {
  const token = localStorage.getItem("token");

  return (
    <ErrorBoundary>
      <div>
        <Navbar />
        <main className="main-container">
          <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/team" element={<Team />} />
            <Route path="/book-studio" element={<BookStudio />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={token ? <Admin /> : <Navigate to="/login" replace />}
            />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </Suspense>
      </main>
    </div>
    </ErrorBoundary>
  );
}

export default App;
