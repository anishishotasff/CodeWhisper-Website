import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import MouseGradient from './components/MouseGradient';
import Hero from './sections/Hero';
import Features from './sections/Features';
import Demo from './sections/Demo';
import HowItWorks from './sections/HowItWorks';
import Pricing from './sections/Pricing';
import Download from './sections/Download';
import Blog from './sections/Blog';
import FAQ from './sections/FAQ';
import Roadmap from './sections/Roadmap';
import Footer from './sections/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function HomePage() {
  return (
    <>
      <CustomCursor />
      <MouseGradient />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Features />
        <Demo />
        <HowItWorks />
        <Pricing />
        <Download />
        <Blog />
        <FAQ />
        <Roadmap />
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
