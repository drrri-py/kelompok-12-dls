
import React from 'react';
import Header from './components/Header';
import Spotlight from './components/Spotlight';
import AboutItem from './components/AboutItem';
import { ABOUT, CASE_STUDIES, IMPLEMENTASI, EVALUASI, KESIMPULAN } from './constants';
import CaseStudyItem from './components/CaseStudyItem';

const App: React.FC = () => {
  return (
    <div className="relative">
      <Spotlight />

      <div className="mx-auto min-h-screen max-w-screen-2xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">

          <Header />

          <main id="content" className="pt-24 lg:w-3/5 lg:py-24">

            {/* About Section */}
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">About</h2>
              </div>
              <div>
                {ABOUT.map((item, index) => (
                  <AboutItem
                    key={index}
                    text={item.text}
                    
                    downloads={item.downloads}
                    codes={item.codes} // Mengirim array download
                  />
                ))}
              </div>
            </section>

            {/* Studi kasus Section */}
            <section id="studi-kasus" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">Studi Kasus</h2>
              </div>
              <div>
                {CASE_STUDIES.map((item, index) => (
                  <CaseStudyItem
                    key={index}
                    text={item.text}
                    title={item.title}
                    formula={item.formula}
                    downloads={item.downloads}
                    codes={item.codes}
                    image={item.image}
                    imageCaption={item.imageCaption}
                  />
                ))}
              </div>
            </section>

            {/* Section Implementasi (Baru) */}
            <section id="implementasi" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 bg-slate-900/75 py-5 backdrop-blur lg:sr-only">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">Implementasi</h2>
              </div>
              {IMPLEMENTASI.map((item, index) => (
                <CaseStudyItem key={index} {...item} />
              ))}
            </section>

            {/* Section Evaluasi (Baru) */}
            <section id="evaluasi" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 bg-slate-900/75 py-5 backdrop-blur lg:sr-only">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">Evaluasi</h2>
              </div>
              {EVALUASI.map((item, index) => (
                <CaseStudyItem key={index} {...item} />
              ))}
            </section>

            {/* Section Kesimpulan (Baru) */}
            <section id="kesimpulan" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 bg-slate-900/75 py-5 backdrop-blur lg:sr-only">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">Kesimpulan</h2>
              </div>
              {KESIMPULAN.map((item, index) => (
                <CaseStudyItem key={index} {...item} />
              ))}
            </section>

            {/* Footer */}
            <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
              <p>
                Fidriyani 220511064
              </p>
              <p>
                Rizqo Aidzin 220511181
              </p>
              <p>
                Rendriyan Octaviadi Saputra 220511165
              </p>
            </footer>

          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
