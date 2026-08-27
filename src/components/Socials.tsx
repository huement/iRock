import { socials } from "../data/portfolio";

export default function Socials() {
  return (
    <section className="content-block wave-block-bottom content-block--starfield-visible">
      <div className="container">
        <h2 className="display-4 mb-5 layered-title" id="socialmedia">
          <i className="bx bxs-planet me-2"></i>Reach Out
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
