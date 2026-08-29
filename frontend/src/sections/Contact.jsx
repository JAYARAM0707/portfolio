import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, ArrowUpRight,
  User, Tag, MessageSquare,
} from 'lucide-react';
import { Github, Linkedin, Instagram } from '../components/SocialIcons';
import { profile } from '../data/profile';
import { submitContactForm } from '../lib/api';
import { EASE_OUT } from '../lib/anim';

const fieldContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const fieldItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

// Heading slide-up reveal (observed on the parent so it fires reliably).
const headWrap = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const wordUp = {
  hidden: { y: '115%' },
  visible: { y: '0%', transition: { duration: 0.8, ease: EASE_OUT } },
};

const socials = [
  { name: 'GitHub', href: profile.social.github, Icon: Github },
  { name: 'LinkedIn', href: profile.social.linkedin, Icon: Linkedin },
  { name: 'Instagram', href: profile.social.instagram, Icon: Instagram },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f) {
  const e = {};
  if (!f.name.trim()) e.name = 'Name is required';
  else if (f.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
  if (!f.email.trim()) e.email = 'Email is required';
  else if (!EMAIL_REGEX.test(f.email.trim())) e.email = 'Invalid email address';
  if (!f.message.trim()) e.message = 'Message is required';
  else if (f.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
  return e;
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate(formData);
    if (Object.keys(v).length) { setErrors(v); return; }
    setErrors({});
    setIsSubmitting(true);
    try {
      await submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject?.trim() || undefined,
        message: formData.message.trim(),
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const box =
    'w-full bg-navy/60 border border-slate-dark/40 rounded-xl pl-11 pr-4 py-3.5 text-slate-lightest ' +
    'placeholder-slate/50 font-sans text-[0.95rem] transition-all duration-300 ' +
    'focus:outline-none focus:border-accent focus:bg-navy focus:ring-4 focus:ring-accent/10';
  const inputCls = (f) => `${box} ${errors[f] ? 'border-red-500/60' : ''}`;
  const lbl = 'block text-[0.68rem] font-mono uppercase tracking-wider text-slate mb-2';
  const iconCls = 'absolute left-4 bottom-[0.95rem] text-slate peer-focus:text-accent';
  const errCls = 'mt-1.5 text-xs text-red-400 flex items-center gap-1';

  return (
    <section id="contact" className="relative overflow-hidden py-24 lg:py-28">
      {/* giant ghost word */}
      <span aria-hidden className="ghost-word left-1/2 -translate-x-1/2 bottom-4 text-[26vw] hidden lg:block">HELLO</span>
      {/* ambient glow */}
      <div aria-hidden className="absolute -top-20 left-1/4 w-[38rem] h-[38rem] rounded-full bg-accent/10 blur-[130px] pointer-events-none" />

      <div className="relative section-padding container-max">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-start">

          {/* LEFT - statement + direct contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            <p className="eyebrow mb-5"><span className="text-slate-dark mr-2">06</span> Get in Touch</p>

            {/* Single line, slide-up reveal per word (observed on the h2) */}
            <motion.h2
              variants={headWrap}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="font-display font-black uppercase tracking-tight leading-[0.9]
                         text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-slate-lightest
                         flex flex-wrap items-baseline gap-x-4"
            >
              <span className="inline-block overflow-hidden pb-[0.12em]">
                <motion.span variants={wordUp} className="inline-block">Let's</motion.span>
              </span>
              <span className="inline-block overflow-hidden pb-[0.12em]">
                <motion.span variants={wordUp} className="inline-block text-outline">talk.</motion.span>
              </span>
            </motion.h2>

            <p className="mt-6 max-w-md text-base sm:text-lg text-slate-light leading-relaxed">
              Have a project, a role, or an idea worth building? My inbox is always open -
              I usually reply within <span className="text-slate-lightest">24 hours</span>.
            </p>

            {/* availability */}
            <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/5 px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="font-mono text-sm text-slate-light">Available for new opportunities</span>
            </div>

            {/* direct contact rows */}
            <div className="mt-10 space-y-1 border-t border-slate-dark/30">
              <a href={`mailto:${profile.email}`}
                 className="group flex items-center justify-between gap-4 py-4 border-b border-slate-dark/30">
                <span className="flex items-center gap-3 text-slate">
                  <Mail size={16} className="text-accent" />
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider">Email</span>
                </span>
                <span className="flex items-center gap-2 text-slate-lightest group-hover:text-accent transition-colors">
                  {profile.email}
                  <ArrowUpRight size={15} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </span>
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}
                 className="group flex items-center justify-between gap-4 py-4 border-b border-slate-dark/30">
                <span className="flex items-center gap-3 text-slate">
                  <Phone size={16} className="text-accent" />
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider">Phone</span>
                </span>
                <span className="text-slate-lightest group-hover:text-accent transition-colors">{profile.phone}</span>
              </a>
              <div className="flex items-center justify-between gap-4 py-4">
                <span className="flex items-center gap-3 text-slate">
                  <MapPin size={16} className="text-accent" />
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider">Location</span>
                </span>
                <span className="text-slate-lightest">{profile.location}</span>
              </div>
            </div>

            {/* socials */}
            <div className="mt-7 flex items-center gap-2">
              {socials.map(({ name, href, Icon }) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name}
                   className="w-11 h-11 rounded-xl border border-slate-dark/40 flex items-center justify-center
                              text-slate-light hover:text-accent hover:border-accent hover:-translate-y-0.5 transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT - form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.12, ease: EASE_OUT }}
            className="rounded-3xl border border-slate-dark/40 bg-navy-light/50 backdrop-blur-sm p-7 sm:p-9 lg:mt-4"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div key="ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }} className="text-center py-14">
                  <CheckCircle2 size={46} className="text-accent mb-4 mx-auto" />
                  <h3 className="font-display text-2xl text-slate-lightest mb-2">Message sent</h3>
                  <p className="text-sm text-slate-light max-w-xs mx-auto">Thanks for reaching out - I'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form key="form" variants={fieldContainer} initial="hidden" animate="visible" exit={{ opacity: 0 }}
                             onSubmit={handleSubmit} noValidate className="space-y-5">
                  <motion.div variants={fieldItem}>
                    <label htmlFor="name" className={lbl}>Your Name</label>
                    <div className="relative">
                      <input id="name" name="name" type="text" placeholder="Jayaram" value={formData.name} onChange={handleChange} className={`peer ${inputCls('name')}`} />
                      <User size={16} className={iconCls} />
                    </div>
                    {errors.name && <p className={errCls}><AlertCircle size={12} />{errors.name}</p>}
                  </motion.div>
                  <motion.div variants={fieldItem}>
                    <label htmlFor="email" className={lbl}>Email</label>
                    <div className="relative">
                      <input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} className={`peer ${inputCls('email')}`} />
                      <Mail size={16} className={iconCls} />
                    </div>
                    {errors.email && <p className={errCls}><AlertCircle size={12} />{errors.email}</p>}
                  </motion.div>

                  <motion.div variants={fieldItem}>
                    <label htmlFor="subject" className={lbl}>Subject (optional)</label>
                    <div className="relative">
                      <input id="subject" name="subject" type="text" placeholder="Let's collaborate on..." value={formData.subject} onChange={handleChange} className={`peer ${inputCls('subject')}`} />
                      <Tag size={16} className={iconCls} />
                    </div>
                  </motion.div>

                  <motion.div variants={fieldItem}>
                    <label htmlFor="message" className={lbl}>Your Message</label>
                    <div className="relative">
                      <textarea id="message" name="message" rows={4} placeholder="Tell me about your project, role, or just say hi..." value={formData.message} onChange={handleChange} className={`peer ${inputCls('message')} resize-none`} />
                      <MessageSquare size={16} className="absolute left-4 top-[0.95rem] text-slate peer-focus:text-accent" />
                    </div>
                    {errors.message && <p className={errCls}><AlertCircle size={12} />{errors.message}</p>}
                  </motion.div>

                  {errors.submit && <p className="text-sm text-red-400 flex items-center gap-1.5"><AlertCircle size={14} />{errors.submit}</p>}

                  <motion.button variants={fieldItem} type="submit" disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="group w-full px-6 py-4 rounded-xl font-mono text-sm font-semibold bg-accent text-white
                               hover:bg-accent-hover hover:shadow-[0_0_30px_-4px_rgba(56,189,248,0.5)] transition-all duration-300
                               flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {isSubmitting ? (<><Loader2 size={16} className="animate-spin" />Sending...</>)
                      : (<>Send Message<Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" /></>)}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
