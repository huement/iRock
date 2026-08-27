import { useEffect, useState, useRef } from "react";
import Rellax from "rellax";
import { heroData } from "../data/portfolio";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const generateScramble = (targetText: string) =>
  targetText
    .split("")
    .map((char) =>
      char === " " ? " " : LETTERS[Math.floor(Math.random() * LETTERS.length)],
    )
    .join("");

export function ScrambleText({ text, className }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(() => generateScramble(text));
  const [isReady, setIsReady] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startScramble = () => {
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            // Preserve spaces in multi-word names
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join(""),
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, 30);
  };

  // Fires automatically on page load
  useEffect(() => {
    setIsReady(true);
    startScramble();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <h1
      className={`${className || ""} scramble-text ${isReady ? "is-visible" : ""}`}
      onMouseOver={startScramble}
    >
      {displayText}
    </h1>
  );
}

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
      <div className="hero-card min-height" ref={cardRef}>
        <ScrambleText
          text={heroData.name}
          className="display-1 cool-title mb-2"
        />
        <ScrambleText
          text={heroData.tagline}
          className="h4 text-uppercase tracking-widest cool-title mb-4 d-block p-relative w-100"
        />
        <p className="lead text-summary px-lg-5">{heroData.intro}</p>
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
