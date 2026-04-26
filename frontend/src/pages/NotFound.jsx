import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen bg-navy text-slate-lightest flex items-center justify-center section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl"
      >
        <p className="eyebrow mb-4">Error 404</p>
        <h1 className="font-display font-extrabold text-7xl sm:text-8xl md:text-9xl text-slate-lightest mb-4 leading-none">
          4<span className="text-accent">0</span>4
        </h1>
        <p className="text-lg sm:text-xl text-slate-light mb-8">
          This page took a wrong turn. Let's get you back home.
        </p>
        <Link to="/" className="btn-primary">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;
