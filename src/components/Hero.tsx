import { useEffect, useRef } from "react";
import Rellax from "rellax";
import { heroData } from "../data/portfolio";

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rellaxRef = useRef<ReturnType<typeof Rellax> | null>(null);

  useEffect(() => {
    if (cardRef.current) {
      rellaxRef.current = new Rellax(cardRef.current, { speed: 1.5 });
    }
    return () => {
      if (rellaxRef.current?.destroy) {
        rellaxRef.current.destroy();
      }
      rellaxRef.current = null;
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-card" ref={cardRef}>
        <h1 className="display-1 cool-title mb-2">{heroData.name}</h1>
        <h2 className="h4 text-uppercase tracking-widest cool-title mb-4 d-block p-relative w-100">
          {heroData.tagline}
        </h2>
        <p className="lead text-secondary px-lg-5">{heroData.intro}</p>
        <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
          <a href="#work" className="hero-cta-secondary">
            <i className="bx bxs-rocket me-2"></i>
            {heroData.ctaWork}
          </a>

          <a href="#contact" className="hero-cta-primary">
            <i className="bx bxs-paper-plane me-2"></i>
            {heroData.ctaContact}
          </a>
        </div>
      </div>
    </section>
  );
}
