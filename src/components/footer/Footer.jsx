import React from 'react'
import './footer.css'

const NAV_LINKS = [
  { label: 'Generate', href: '/generate' },
  { label: 'History', href: '/history' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Account', href: '/account' },
]

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/',
    path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/',
    path: 'M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.25-2.55a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z',
  },
  {
    label: 'X',
    href: 'https://x.com/',
    path: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z',
  },
  {
    label: 'Email',
    href: 'mailto:hello@quizbot.app',
    path: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2.3V17h16V7.3l-8 5.7-8-5.7Zm1.6-.3L12 11.55 18.4 7H5.6Z',
  },
]

function SocialIcon({ label, href, path }) {
  const isExternal = href.startsWith('http')

  return (
    <a
      className="qb-footer__social-link qb-fade-in"
      href={href}
      aria-label={label}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d={path} />
      </svg>
    </a>
  )
}

function Footer() {
  return (
    <footer className="qb-footer">
      <div className="qb-footer__inner">
        <a href="/" className="qb-footer__logo qb-fade-in" aria-label="QuizBot home">
          QuizBot
        </a>

        <nav className="qb-footer__nav" aria-label="Footer">
          <ul className="qb-footer__list">
            {NAV_LINKS.map(({ label, href }, i) => (
              <li key={label} style={{ '--qb-i': i }}>
                <a className="qb-footer__link qb-fade-in" href={href}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="qb-footer__socials" aria-label="Social media">
          {SOCIAL_LINKS.map((social, i) => (
            <li key={social.label} style={{ '--qb-i': i + NAV_LINKS.length }}>
              <SocialIcon {...social} />
            </li>
          ))}
        </ul>
      </div>

      <p className="qb-footer__copy qb-fade-in">
        © {new Date().getFullYear()} QuizBot. All rights reserved. 
      </p>
    </footer>
  )
}

export default Footer