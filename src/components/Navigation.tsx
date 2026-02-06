
import React, { useEffect, useState } from 'react';
import { SectionId } from '../types';

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('about');

  useEffect(() => {
    const sections: SectionId[] = ['about', 'studi-kasus', 'implementasi', 'evaluasi', 'kesimpulan'];

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as SectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems: { id: SectionId; label: string }[] = [
    { id: 'about', label: 'ABOUT' },
    { id: 'studi-kasus', label: 'STUDI KASUS' },
    { id: 'implementasi', label: 'IMPLEMENTASI' },
    { id: 'evaluasi', label: 'EVALUASI' },
    { id: 'kesimpulan', label: 'KESIMPULAN' },
  ];

  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <ul className="mt-16 w-max">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              className={`group flex items-center py-3 transition-all ${activeSection === item.id ? 'active' : ''
                }`}
              href={`#${item.id}`}
            >
              <span
                className={`mr-4 h-px transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 ${activeSection === item.id ? 'w-16 bg-slate-200' : 'w-8 bg-slate-600'
                  }`}
              ></span>
              <span
                className={`text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200 ${activeSection === item.id ? 'text-slate-200' : 'text-slate-500'
                  }`}
              >
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
