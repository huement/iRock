import { useEffect, useState } from "react";

interface DrawerState {
  isOpen: boolean;
  title: string;
  mediaSrc: string;
  isVideo: boolean;
  detailsHtml: string;
  ctaUrl?: string;
  ctaText?: string;
}

export default function LightboxDrawer() {
  const [drawer, setDrawer] = useState<DrawerState>({
    isOpen: false,
    title: "",
    mediaSrc: "",
    isVideo: false,
    detailsHtml: "",
  });

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (drawer.isOpen && !isClosing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer.isOpen, isClosing]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest<HTMLAnchorElement>(".lightbox-toggle");
      if (!link) return;

      e.preventDefault();
      e.stopPropagation();

      const videoSrc = link.getAttribute("data-video-src");
      const videoTitle = link.getAttribute("data-video-title");
      const title = videoTitle || link.getAttribute("data-title") || "";
      const mediaSrc = videoSrc || link.getAttribute("href") || "";
      const detailsHtml = link.getAttribute("data-details") || "";
      const ctaUrl = link.getAttribute("data-cta-url") || undefined;
      const ctaText = link.getAttribute("data-cta-text") || undefined;

      setIsClosing(false);
      setDrawer({
        isOpen: true,
        title,
        mediaSrc,
        isVideo: Boolean(videoSrc),
        detailsHtml,
        ctaUrl,
        ctaText,
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeDrawer = () => {
    setIsClosing(true);
    // Wait for the 280ms exit animation to complete before unmounting
    setTimeout(() => {
      setDrawer((prev) => ({ ...prev, isOpen: false }));
      setIsClosing(false);
    }, 280);
  };

  if (!drawer.isOpen) return null;

  return (
    <>
      {/* Keyframe Animation Styles */}
      <style>{`
        @keyframes drawerOverlayIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(4px); }
        }
        @keyframes drawerOverlayOut {
          from { opacity: 1; backdrop-filter: blur(4px); }
          to { opacity: 0; backdrop-filter: blur(0px); }
        }
        @keyframes drawerSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes drawerSlideOut {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }

        .animate-overlay-in {
          animation: drawerOverlayIn 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-overlay-out {
          animation: drawerOverlayOut 280ms cubic-bezier(0.7, 0, 0.84, 0) forwards;
        }
        .animate-drawer-in {
          animation: drawerSlideIn 320ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-drawer-out {
          animation: drawerSlideOut 280ms cubic-bezier(0.7, 0, 0.84, 0) forwards;
        }
      `}</style>

      {/* Dimmed Overlay Backdrop */}
      <div
        className={`fixed-top w-100 h-100 ${isClosing ? "animate-overlay-out" : "animate-overlay-in"}`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          zIndex: 1045,
        }}
        onClick={closeDrawer}
      />

      {/* Slide-in Drawer Container */}
      <div
        className={`offcanvas offcanvas-end show text-light border-start border-secondary shadow-lg ${
          isClosing ? "animate-drawer-out" : "animate-drawer-in"
        }`}
        tabIndex={-1}
        style={{
          visibility: "visible",
          zIndex: 1050,
          width: "100%",
          maxWidth: "650px",
          backgroundColor: "#0f1117",
        }}
      >
        {/* Header */}
        <div className="offcanvas-header border-bottom border-secondary py-3 px-4">
          <h4 className="offcanvas-title text-white m-0">{drawer.title}</h4>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={closeDrawer}
          />
        </div>

        {/* Body */}
        <div className="offcanvas-body p-4">
          {/* Media Display */}
          <div className="text-center bg-black rounded p-2 mb-4 border border-secondary border-opacity-25">
            {drawer.isVideo ? (
              <video
                src={drawer.mediaSrc}
                controls
                autoPlay
                className="img-fluid rounded"
                style={{ maxHeight: "50vh", objectFit: "contain" }}
              />
            ) : (
              <img
                src={drawer.mediaSrc}
                alt={drawer.title}
                className="img-fluid rounded"
                style={{ maxHeight: "50vh", objectFit: "contain" }}
              />
            )}
          </div>

          {/* Formatted Markdown Details */}
          <div
            className="markdown-details text-light opacity-90"
            dangerouslySetInnerHTML={{ __html: drawer.detailsHtml }}
          />

          {/* Call to Action Button */}
          {drawer.ctaUrl && (
            <div className="mt-4 pt-3 border-top border-secondary">
              <a
                href={drawer.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-info"
              >
                {drawer.ctaText || "Visit Project"}{" "}
                <i className="bx bx-right-arrow-alt ms-1"></i>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
