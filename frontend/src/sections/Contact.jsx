import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Github, Linkedin } from '../components/SocialIcons';

const contactMethods = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'marnijayaram0707@gmail.com',
    href: 'mailto:marnijayaram0707@gmail.com',
    external: false,
  },
  {
    Icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/marnijayaram',
    href: 'https://linkedin.com/in/marnijayaram',
    external: true,
  },
  {
    Icon: Github,
    label: 'GitHub',
    value: 'github.com/JAYARAM0707',
    href: 'https://github.com/JAYARAM0707',
    external: true,
  },
  {
    Icon: MapPin,
    label: 'Location',
    value: 'Hyderabad, India',
    href: null,
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(formData) {
  const errors = {};
  if (!formData.name.trim()) errors.name = 'Name is required';
  else if (formData.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';

  if (!formData.email.trim()) errors.email = 'Email is required';
  else if (!EMAIL_REGEX.test(formData.email.trim())) errors.email = 'Invalid email address';

  if (!formData.message.trim()) errors.message = 'Message is required';
  else if (formData.message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters';

  return errors;
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate(formData);
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    // Fake API call — backend wiring comes later
    await new Promise((r) => setTimeout(r, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setIsSuccess(false), 5000);
  };

  const inputBase =
    'w-full bg-navy border rounded-lg px-4 py-3 text-slate-lightest placeholder-slate ' +
    'font-sans text-sm sm:text-base transition-all duration-300 ' +
    'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';
  const inputCls = (field) =>
    `${inputBase} ${errors[field] ? 'border-red-500/60' : 'border-slate-dark/40'}`;
  const labelCls = 'block text-xs font-mono uppercase tracking-wider text-slate-light mb-2';
  const errorCls = 'mt-1.5 text-xs text-red-400 flex items-center gap-1';

  return (
    <section
      id="contact"
      className="section-padding container-max py-24 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16"
      >
        <p className="eyebrow mb-3">Get in Touch</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-lightest mb-4">
          Let's build something <span className="text-accent">together</span>
        </h2>
        <p className="text-base md:text-lg text-slate-light max-w-2xl mx-auto">
          Open to opportunities, collaborations, and good conversations.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* LEFT — Contact methods */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-5">
            {contactMethods.map(({ Icon, label, value, href, external }, i) => {
              const inner = (
                <>
                  <div className="w-11 h-11 rounded-lg bg-accent/10 border border-accent/20
                                  flex items-center justify-center text-accent shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate">
                      {label}
                    </span>
                    <span className="text-sm sm:text-base text-slate-lightest hover:text-accent transition-colors break-all">
                      {value}
                    </span>
                  </div>
                </>
              );

              const wrapperCls = 'flex items-center gap-4';
              const animProps = {
                initial: { opacity: 0, y: 10 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.4, delay: 0.2 + i * 0.08 },
              };

              if (href) {
                return (
                  <motion.a
                    key={label}
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className={wrapperCls + ' group'}
                    {...animProps}
                  >
                    {inner}
                  </motion.a>
                );
              }
              return (
                <motion.div key={label} className={wrapperCls} {...animProps}>
                  {inner}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-dark/30 flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="font-mono text-sm text-slate-light">
              Currently available for new opportunities
            </span>
          </div>
        </motion.div>

        {/* RIGHT — Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-navy-light border border-slate-dark/30 rounded-2xl p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-center py-12"
              >
                <CheckCircle2 size={48} className="text-accent mb-4 mx-auto" />
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-lightest mb-2">
                  Message sent! 🎉
                </h3>
                <p className="text-sm sm:text-base text-slate-light max-w-md mx-auto">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                <div>
                  <label htmlFor="name" className={labelCls}>Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputCls('name')}
                  />
                  {errors.name && (
                    <p className={errorCls}>
                      <AlertCircle size={12} />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={labelCls}>Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputCls('email')}
                  />
                  {errors.email && (
                    <p className={errorCls}>
                      <AlertCircle size={12} />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className={labelCls}>Subject (optional)</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Let's collaborate on..."
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputCls('subject')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelCls}>Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project, role, or just say hi..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputCls('message')} resize-none`}
                  />
                  {errors.message && (
                    <p className={errorCls}>
                      <AlertCircle size={12} />
                      {errors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg font-mono text-sm font-medium
                             bg-accent text-navy hover:bg-accent-hover transition-colors duration-300
                             flex items-center justify-center gap-2
                             disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
