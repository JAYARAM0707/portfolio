import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';

function App() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
