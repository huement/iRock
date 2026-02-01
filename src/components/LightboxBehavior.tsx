import { useEffect } from 'react';

declare global {
  interface Window {
    Lightbox?: { initialize: (e: Event) => void };
  }
}

const VIDEO_MODAL_ID = 'videoLightboxModal';
const VIDEO_PLAYER_ID = 'videoLightboxPlayer';

/**
 * Attaches lightbox behavior: image (bs5-lightbox) or video (Bootstrap modal).
 * Uses event delegation so it works for all .lightbox-toggle (including carousel
 * items that may be in the DOM after this component mounts). Capture + preventDefault
 * so clicking never navigates or scrolls.
 */
export default function LightboxBehavior() {
  useEffect(() => {
    const videoModalEl = document.getElementById(VIDEO_MODAL_ID);
    const videoPlayerEl = document.getElementById(VIDEO_PLAYER_ID) as HTMLVideoElement | null;

    const handler = (e: Event) => {
      const link = (e.target as HTMLElement)?.closest?.('.lightbox-toggle');
      if (!link) return;
      e.preventDefault();
      e.stopPropagation();

      const videoSrc = link.getAttribute('data-video-src');
      const videoTitle = link.getAttribute('data-video-title');

      if (videoSrc && videoModalEl && videoPlayerEl) {
        videoPlayerEl.pause();
        videoPlayerEl.removeAttribute('src');
        videoPlayerEl.load();
        videoPlayerEl.src = videoSrc;
        const labelEl = document.getElementById('videoLightboxModalLabel');
        if (labelEl) labelEl.textContent = videoTitle ?? 'Video';
        const trigger = document.getElementById('videoLightboxModalTrigger');
        trigger?.click();
        return;
      }

      if (typeof window.Lightbox !== 'undefined') {
        window.Lightbox.initialize.call(link, e);
      }
    };

    document.addEventListener('click', handler, true);

    const onModalHidden = () => {
      if (videoPlayerEl) {
        videoPlayerEl.pause();
        videoPlayerEl.removeAttribute('src');
        videoPlayerEl.load();
      }
    };
    videoModalEl?.addEventListener('hidden.bs.modal', onModalHidden);

    return () => {
      document.removeEventListener('click', handler, true);
      videoModalEl?.removeEventListener('hidden.bs.modal', onModalHidden);
    };
  }, []);

  return null;
}
