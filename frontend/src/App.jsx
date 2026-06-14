import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';
import CinematicIntro from './components/CinematicIntro';
import { shouldShowIntro } from './lib/intro';

function App() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(() => shouldShowIntro());

  return (
    <>
      {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
