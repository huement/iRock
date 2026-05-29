import { useEffect, useRef } from "react";

const SECTIONS = [
  { id: "work", label: "Work", icon: "bxs-tv" },
  { id: "timeline", label: "Timeline", icon: "bxs-time" },
  { id: "hobbies", label: "Hobbies", icon: "bxs-dog" },
  { id: "contact", label: "Contact", icon: "bxs-contact" },
] as const;

/**
 * Section nav with scroll-spy and Sticky Sentinel pattern:
 * - Sentinel (1px above nav): when it leaves the viewport, nav is "stuck".
 * - Scroll down while stuck → skinny (.scroll-down).
 * - Scroll up while stuck → full padding (.scroll-up).
 * - Scroll back above sentinel → nav returns to flow (no is-stuck).
 * Uses IntersectionObserver for pinning (no height calculations).
 */
export default function SectionNav() {
  const navRef = useRef<HTMLElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const nav = navRef.current;
    const sentinel = sentinelRef.current;
    if (!nav || !sentinel) return;

    const links = nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    if (!links.length) return;

    const sections = SECTIONS.map(({ id }) =>
      document.getElementById(id),
    ).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const setActiveFromScroll = () => {
      const viewportMid = window.scrollY + window.innerHeight * 0.35;
      let activeId: string | null = null;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        const top = el.getBoundingClientRect().top + window.scrollY;
        const bottom = top + el.offsetHeight;
        if (viewportMid >= top && viewportMid <= bottom) {
          activeId = el.id;
          break;
        }
        if (viewportMid > bottom) {
          activeId = el.id;
          break;
        }
      }
      if (!activeId && sections[0]) activeId = sections[0].id;
      links.forEach((a) => {
        const isActive = a.getAttribute("href") === `#${activeId}`;
        a.classList.toggle("active", isActive);
        a.setAttribute("aria-current", isActive ? "page" : "false");
      });
    };

    // 1. Stuck state: sentinel leaves viewport → is-stuck
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (!entry.isIntersecting) {
          nav.classList.add("is-stuck");
        } else {
          nav.classList.remove("is-stuck");
          nav.classList.remove("scroll-down");
          nav.classList.remove("scroll-up");
        }
      },
      { threshold: 0, rootMargin: "0px" },
    );
    observer.observe(sentinel);

    // 2. Scroll direction (only when stuck)
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
        <div className="section-nav-inner">
          {SECTIONS.map(({ id, label, icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className="section-nav-link"
              aria-current="false"
            >
              <i className={`bx ${icon} icon-nav me-2 text-info`}></i>
              {label}
            </a>
          ))}
        </div>
      </header>
    </>
  );
}
