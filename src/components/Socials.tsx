import { socials } from '../data/portfolio';
import { useEffect } from 'react';

export default function Socials() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document
      .querySelectorAll('#socialmedia .reveal-on-scroll')
      .forEach((el) => {
        observer.observe(el);
      });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="content-block wave-block-bottom content-block--starfield-visible">
      <div className="container" id="socialmedia">
        <h2 className="display-4 mb-5 layered-title reveal-on-scroll">
          <i className="bx bxs-planet me-2" aria-hidden="true"></i>Reach Out
        </h2>
        <div className="row g-4">
          {socials.map((s, idx) => (
            <div
              key={s.title}
              className="col-md-4 reveal-on-scroll"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="card h-100 social-card p-4 text-center">
                <div className={`mb-3 ${s.iconColorClass}`}>
                  <i className={`bx ${s.icon} icon-large`}></i>
                </div>
                <h3>{s.title}</h3>
                <p className="text-muted">{s.description}</p>
                <a
                  href={s.href}
                  className={`social-card-btn mt-auto ${s.iconColorClass}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{s.buttonText}</span>
                  <i className="bx bx-right-arrow-alt icon-arrow"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
