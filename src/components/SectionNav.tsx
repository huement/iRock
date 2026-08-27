import { useEffect, useRef } from "react";

const SECTIONS = [
  { id: "work", label: "Projects", icon: "bxs-tv" },
  { id: "timeline", label: "Employment", icon: "bxs-time" },
  { id: "hobbies", label: "Hobbies", icon: "bxs-dog" },
  { id: "socialmedia", label: "Social", icon: "bxs-star" },
  { id: "contact", label: "Contact", icon: "bxs-contact" },
] as const;

export default function SectionNav() {
  const navRef = useRef<HTMLElement>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const activeLinkRef = useRef<string | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    const navInner = navInnerRef.current;
    const sentinel = sentinelRef.current;
    if (!nav || !sentinel) return;

    const links = nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    if (!links.length) return;

    const setActiveFromScroll = () => {
      const navHeight = nav.offsetHeight || 60;
      const scrollPosition = window.scrollY + navHeight + 80;

      let currentSectionId: string = SECTIONS[0].id;

      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            currentSectionId = id;
          }
        }
      });

      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      if (isAtBottom) {
        currentSectionId = SECTIONS[SECTIONS.length - 1].id;
      }

      links.forEach((a) => {
        const isActive = a.getAttribute("href") === `#${currentSectionId}`;
        a.classList.toggle("active", isActive);
        a.setAttribute("aria-current", isActive ? "page" : "false");

        // Auto-scroll active link to screen center on mobile
        if (isActive && activeLinkRef.current !== currentSectionId) {
          activeLinkRef.current = currentSectionId;
          if (navInner && window.innerWidth < 768) {
            const linkLeft = a.offsetLeft;
            const linkWidth = a.offsetWidth;
            const containerWidth = navInner.offsetWidth;
            navInner.scrollTo({
              left: linkLeft - containerWidth / 2 + linkWidth / 2,
              behavior: "smooth",
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (!entry.isIntersecting) {
          nav.classList.add("is-stuck");
        } else {
          nav.classList.remove("is-stuck", "scroll-down", "scroll-up");
        }
      },
      { threshold: 0, rootMargin: "0px" },
    );
    observer.observe(sentinel);

    const onScroll = () => {
      setActiveFromScroll();

      if (!nav.classList.contains("is-stuck")) return;
      const currentScrollY = window.scrollY;
      const last = lastScrollYRef.current;

      if (currentScrollY > last) {
        nav.classList.remove("scroll-up");
        nav.classList.add("scroll-down");
      } else {
        nav.classList.remove("scroll-down");
        nav.classList.add("scroll-up");
      }
      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;
    setActiveFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div
        id="header-sentinel"
        ref={sentinelRef}
        className="header-sentinel"
        aria-hidden="true"
      />
      <header
        id="site-header"
        ref={navRef}
        className="site-header section-nav"
        aria-label="Page sections"
      >
        <div ref={navInnerRef} className="section-nav-inner">
          {SECTIONS.map(({ id, label, icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className="section-nav-link"
              aria-current="false"
            >
              <i className={`bx ${icon} icon-nav text-info`}></i>
              <span className="nav-label">{label}</span>
            </a>
          ))}
        </div>
      </header>
    </>
  );
}
