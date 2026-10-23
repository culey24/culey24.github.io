'use client';

import { useEffect } from 'react';

const SCROLL_MS = 220;

/**
 * The site navigates with plain anchors (static export), so a route change is a
 * full page load. To make tab switches feel smooth, scroll to the top first and
 * navigate once the scroll animation has had a moment to play.
 */
export function ScrollToTopOnNavigate() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.('a');
      if (!anchor) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href');
      if (!href) return;
      if (href.startsWith('#')) return;
      if (/^(?:[a-z]+:)?\/\//i.test(href)) return;
      if (href.startsWith('mailto:') || href.startsWith('tel:')) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;

      // Same page (anchors such as /#about): let the browser handle it.
      if (url.pathname === window.location.pathname) return;

      if (window.scrollY <= 0) return;

      event.preventDefault();

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.location.href = url.href;
        return;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.setTimeout(() => {
        window.location.href = url.href;
      }, SCROLL_MS);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
