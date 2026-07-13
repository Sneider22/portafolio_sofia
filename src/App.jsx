import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ProjectDetail } from './pages/ProjectDetail';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 font-sans bg-grid-pattern transition-colors duration-300 flex flex-col justify-between">
          <div>
            {/* Double Cursor */}
            <CustomCursor />

            {/* Navigation */}
            <Navbar />

            {/* Main view container */}
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

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
