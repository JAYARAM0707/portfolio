import { motion } from 'framer-motion';
import { Smartphone, Sparkles, Code2, Wrench } from 'lucide-react';

const categories = [
  {
    icon: Smartphone,
    title: 'Mobile Development',
    skills: ['React Native', 'Redux Toolkit', 'iOS Development', 'Android Development', 'React Navigation', 'TypeScript'],
  },
  {
    icon: Sparkles,
    title: 'AI & Backend',
    skills: ['GPT-4 API', 'OpenAI Integration', 'Python', 'FastAPI', 'REST APIs', 'AI-IVR Systems'],
  },
  {
    icon: Code2,
    title: 'Frontend & Web',
    skills: ['React.js', 'JavaScript', 'HTML / CSS', 'Tailwind CSS', 'Vite'],
  },
  {
    icon: Wrench,
    title: 'Tools & Workflow',
    skills: ['Git & GitHub', 'Figma to Code', 'VS Code', 'Postman', 'Agile / Scrum', 'npm'],
  },
];

function Skills() {
  return (
    <section
      id="skills"
      className="section-padding container-max py-24 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 md:mb-16"
      >
        <p className="eyebrow mb-3">Skills</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-lightest">
          What I work with <span className="text-accent">daily</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="group bg-navy-light border border-slate-dark/30 rounded-xl p-6
                       hover:border-accent transition-all duration-300
                       hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center
                              group-hover:bg-accent/20 transition-colors duration-300">
                <cat.icon size={22} className="text-accent" />
              </div>
              <h3 className="text-lg md:text-xl font-display font-bold text-slate-lightest">
                {cat.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, j) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 + j * 0.04 }}
                  className="px-3 py-1 rounded-full text-xs font-mono
                             bg-navy border border-slate-dark/40
                             text-slate-light hover:text-accent hover:border-accent
                             transition-colors duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
