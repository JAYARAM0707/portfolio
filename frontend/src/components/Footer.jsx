import { Github, Linkedin, Instagram } from './SocialIcons';
import { profile } from '../data/profile';

const socials = [
  { name: 'GitHub', href: profile.social.github, Icon: Github },
  { name: 'LinkedIn', href: profile.social.linkedin, Icon: Linkedin },
  { name: 'Instagram', href: profile.social.instagram, Icon: Instagram },
];

function Footer() {
  return (
    <footer className="border-t border-slate-dark/30 mt-8">
      <div className="container-max section-padding py-8 sm:py-10
                      flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <p className="text-xs sm:text-sm font-mono text-slate text-center sm:text-left">
          Designed & built by{' '}
          <span className="text-accent font-semibold">{profile.name}</span>
        </p>

        <div className="flex items-center gap-1">
          {socials.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={name}
              className="p-2 rounded-lg text-slate-light hover:text-accent
                         hover:bg-accent-muted transition-colors duration-300"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <p className="text-xs font-mono text-slate">
          © {new Date().getFullYear()} · v1.0
        </p>
      </div>
    </footer>
  );
}

export default Footer;
