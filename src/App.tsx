import React from 'react';
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
import Footer from './sections/Footer';

export default function App() {
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
        <Footer />
      </div>
    </>
  );
}
