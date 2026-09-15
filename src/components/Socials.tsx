import { useEffect } from 'react';
import { socials } from '../data/portfolio';

export default function Socials() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll('#socialmedia .reveal-on-scroll')
      .forEach((el) => {
        observer.observe(el);
      });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="socialmedia" className="relative z-10 py-20 overflow-hidden">
      <div className="relative w-full h-[100px] d-block block"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layered Title Header */}
        <h2 className="layered-title text-5xl sm:text-7xl md:text-8xl font-black font-saira tracking-tight text-center mb-16 uppercase reveal-on-scroll">
          <i className="bx bxs-planet inline-block mr-3" aria-hidden="true"></i>
          Reach Out
        </h2>

        {/* Cyberpunk Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {socials.map((s, idx) => (
            <div
              key={s.title}
              className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out flex"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="group relative w-full flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl gcard hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2">
                {/* HUD Top Corner Accents */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-400/60 pointer-events-none"></div>
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-400/60 pointer-events-none"></div>

                {/* Animated Social Icon */}
                <div
                  className={`mb-4 text-5xl sm:text-6xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6 ${s.iconColorClass || 'text-cyan-400'}`}
                >
                  <i className={`bx ${s.icon}`}></i>
                </div>

                {/* Card Info */}
                <div className="flex flex-col flex-grow mb-5">
                  <h3 className="text-2xl font-extrabold font-saira tracking-tight text-slate-100 group-hover:text-white transition-colors mb-2">
                    {s.title}
                  </h3>

                  <p className="text-slate-300 text-sm font-light leading-relaxed flex-grow">
                    {s.description}
                  </p>
                </div>

                {/* Cyber CTA Button */}
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 font-mono text-xs font-bold tracking-wider text-cyan-300 uppercase bg-slate-950 border border-cyan-500/40 rounded-lg hover:bg-cyan-500 hover:text-slate-950 transition-all duration-200 shadow-md group/btn"
                >
                  <span>{s.buttonText}</span>
                  <i className="bx bx-right-arrow-alt text-lg group-hover/btn:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
