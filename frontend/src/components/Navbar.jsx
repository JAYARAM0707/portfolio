import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Github, Linkedin, Instagram, Youtube } from './SocialIcons';
import { useTheme } from '../hooks/useTheme';

const AVATAR_URL = 'https://api.dicebear.com/9.x/avataaars/svg?seed=MarniJayaram';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/', Icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com/', Icon: Linkedin },
  { name: 'YouTube', href: 'https://youtube.com/', Icon: Youtube },
  { name: 'Instagram', href: 'https://instagram.com/', Icon: Instagram },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      if (y > 100) setIsHidden(y > lastScrollY);
      else setIsHidden(false);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isHidden ? -100 : 0, opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-lg shadow-accent/10 py-3 border-b border-slate-dark/30'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container-max px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-2">

            {/* LEFT: Avatar + Name */}
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0 group"
            >
              <div className="relative shrink-0">
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(239, 68, 68, 0.45)',
                      '0 0 0 10px rgba(239, 68, 68, 0)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full"
                />
                <img
                  src={AVATAR_URL}
                  alt="Marni Jayaram"
                  className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border-2 border-accent bg-navy-light group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="hidden sm:flex flex-col leading-tight min-w-0">
                <span className="text-sm md:text-base font-display font-bold text-slate-lightest group-hover:text-accent transition-colors duration-300 truncate">
                  Marni Jayaram
                </span>
                <span className="text-[0.65rem] md:text-xs font-mono text-accent">
                  &lt;developer /&gt;
                </span>
              </div>
            </Link>

            {/* CENTER: Desktop Nav Links (lg+) */}
            <div className="hidden lg:flex items-center gap-7 xl:gap-9">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                  className="nav-link"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* RIGHT: one cluster, conditionally shows items by breakpoint */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              {/* Socials — tablet+ only */}
              <div className="hidden md:flex items-center gap-0.5">
                {socialLinks.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={name}
                    className="p-2 rounded-lg text-slate-light hover:text-accent hover:bg-accent-muted transition-colors duration-300"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>

              {/* Theme toggle — always visible */}
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="p-2 rounded-lg text-slate-light hover:text-accent hover:bg-accent-muted transition-colors duration-300"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isDark ? 'moon' : 'sun'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="inline-flex"
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.span>
                </AnimatePresence>
              </button>

              {/* Hamburger — below lg only */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                className="lg:hidden p-2 rounded-lg text-accent hover:bg-accent-muted transition-colors"
              >
                <motion.span
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex"
                >
                  {isOpen ? <X size={26} /> : <Menu size={26} />}
                </motion.span>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-navy-light z-40 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full pt-24 px-6 sm:px-8 pb-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.3 }}
                    className="py-4 border-b border-slate-dark/40 text-lg font-display font-semibold text-slate-lightest hover:text-accent transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}

                <div className="flex items-center gap-2 mt-8">
                  {socialLinks.map(({ name, href, Icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={name}
                      className="p-3 rounded-lg text-slate-light hover:text-accent hover:bg-accent-muted transition-colors"
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
