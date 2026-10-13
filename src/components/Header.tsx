import { useState, useEffect } from 'react';
import type { Theme } from '../types';
import { NAV_LINKS } from '../data';
import { useScrollSpy } from '../hooks/useScrollSpy';

interface HeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
}

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace('#', ''));

export const Header = ({ theme, onThemeToggle }: HeaderProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const scrollActiveId = useScrollSpy(SECTION_IDS);
  const [clickedId, setClickedId] = useState('');

  // Hand control back to scroll spy only once it reaches the clicked section
  useEffect(() => {
    if (scrollActiveId === clickedId) setClickedId('');
  }, [scrollActiveId, clickedId]);

  const activeId = clickedId || scrollActiveId;

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = isNavOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isNavOpen]);

  const handleNavLinkClick = (id: string) => {
    setClickedId(id);
    setIsNavOpen(false);
  };

  return (
    <>
      {isNavOpen && (
        <div
          className="site-nav__backdrop"
          aria-hidden="true"
          onClick={() => setIsNavOpen(false)}
        />
      )}
      <header className="site-header">
        <div className="shell">
          <div className="site-header__bar">
            <a href="#hero" className="site-header__logo">
              Shankar P.
            </a>

            <nav className="site-nav" aria-label="Primary">
              <button
                className="site-nav__toggle"
                aria-expanded={isNavOpen}
                aria-label={isNavOpen ? 'Close navigation' : 'Open navigation'}
                onClick={() => setIsNavOpen((o) => !o)}
              >
                <span />
                <span />
              </button>

              <ul className={`site-nav__list${isNavOpen ? ' is-open' : ''}`}>
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className={`site-nav__link${activeId === href.replace('#', '') ? ' is-active' : ''}`}
                      onClick={() => handleNavLinkClick(href.replace('#', ''))}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="site-header__social">
              <a
                href="https://www.linkedin.com/in/shankar-puthani"
                target="_blank"
                rel="noreferrer"
                className="site-header__social-link"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="https://github.com/Shankar-94"
                target="_blank"
                rel="noreferrer"
                className="site-header__social-link"
                aria-label="GitHub"
              >
                gh
              </a>
            </div>

            <button
              className="btn-theme"
              id="theme-toggle"
              aria-label="Toggle dark mode"
              onClick={onThemeToggle}
            >
              <span className="btn-theme__icon" aria-hidden="true">
                {theme === 'dark' ? '☀︎' : '☽'}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
