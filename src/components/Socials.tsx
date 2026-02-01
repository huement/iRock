import { socials } from '../data/portfolio';

export default function Socials() {
  return (
    <section className="content-block wave-block-bottom content-block--starfield-visible">
      <div className="container">
        <h2 className="display-4 mb-5 cool-title">
          <i className="bx bxs-planet me-2"></i>Digital Frontier
        </h2>
        <div className="row g-4">
          {socials.map((s) => (
            <div key={s.title} className="col-md-4">
              <div className="card h-100 social-card p-4 text-center">
                <div className={`mb-3 ${s.iconColorClass}`}>
                  <i className={`bx ${s.icon} icon-large`}></i>
                </div>
                <h3>{s.title}</h3>
                <p className="text-muted">{s.description}</p>
                <a href={s.href} className="btn btn-outline-light mt-auto rounded-pill" target="_blank" rel="noopener noreferrer">
                  {s.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
