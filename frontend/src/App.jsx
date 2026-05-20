import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import PreloaderIntro from './components/PreloaderIntro';

function App() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem('intro-seen');
  });

  const handleIntroDone = () => {
    sessionStorage.setItem('intro-seen', '1');
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <PreloaderIntro onComplete={handleIntroDone} />}
      <SmoothScroll />
      <ScrollProgress />
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
