import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';

function ProjectDetail() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-navy text-slate-lightest section-padding container-max py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-mono text-slate-light
                     hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        <p className="eyebrow mb-3">Project Detail</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-lightest mb-4">
          <span className="text-accent">{slug}</span>
        </h1>
        <p className="text-base md:text-lg text-slate-light leading-relaxed mb-10">
          Detailed write-ups for individual projects are coming soon. For now,
          head back to the home page to explore featured work.
        </p>

        <div className="bg-navy-light/50 border-2 border-dashed border-slate-dark/40
                        rounded-xl p-6 sm:p-8 text-center">
          <Sparkles size={28} className="text-accent/60 mx-auto mb-3" />
          <p className="text-sm text-slate max-w-md mx-auto">
            This page will host case studies, screenshots, architecture diagrams,
            and lessons learned for each project.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default ProjectDetail;
