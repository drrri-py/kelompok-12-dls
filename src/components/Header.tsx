
import React from 'react';
import Navigation from './Navigation';
import { SOCIAL_LINKS } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          <a href="/">Algoritma DLS</a>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          kelompok 12
        </h2>
        <p className="mt-4 max-w-xs leading-normal">
          simulasi penerapan algoritma DLS pada proyek internet rakyat.
        </p>
        <Navigation />
      </div>

      <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.label} className="mr-5 text-xs shrink-0">
            <a
              className="block hover:text-slate-200 transition-colors"
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${link.label} (opens in a new tab)`}
            >
              <span className="sr-only">{link.label}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d={link.icon} />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
