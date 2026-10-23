import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ProjectDetail } from './pages/ProjectDetail';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <Router>
          <div className="relative flex min-h-screen flex-col justify-between bg-bg text-fg transition-colors duration-300">
            <div>
              <ScrollToTop />
              <CustomCursor />
              <Navbar />

              <main className="w-full">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/proyectos" element={<Projects />} />
                  <Route path="/sobre-mi" element={<About />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="/proyecto/:slug" element={<ProjectDetail />} />
                </Routes>
              </main>
            </div>

            <Footer />
          </div>
        </Router>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
