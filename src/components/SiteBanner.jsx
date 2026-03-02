import { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';

const BANNER_KEY = 'lilbo-banner-hidden-until';
const HIDE_MS = 7 * 24 * 60 * 60 * 1000;

function SiteBanner() {
  const bannerRef = useRef(null);
  const [visible, setVisible] = useState(() => {
    const hiddenUntil = Number(localStorage.getItem(BANNER_KEY));
    return !(hiddenUntil && Date.now() < hiddenUntil);
  });
  const [fullHeight, setFullHeight] = useState(0);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    if (!visible) return undefined;

    const updateHeight = () => {
      const nextHeight = bannerRef.current?.offsetHeight ?? 0;
      setFullHeight(nextHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [visible]);

  useEffect(() => {
    if (!visible) return undefined;

    const onScroll = () => {
      setCompact(window.scrollY >= fullHeight && fullHeight > 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [visible, fullHeight]);

  const dismiss = () => {
    localStorage.setItem(BANNER_KEY, String(Date.now() + HIDE_MS));
    setVisible(false);
  };

  if (!visible) return null;

  const renderBannerContent = () => (
    <div className="container site-banner__content">
      <p>
        Due to the substantial hike in the cost of titanium, 
        all orders are PREORDER only until the price goes down,
        or an alternative is found. All changes will be posted on the website, 
        sign up to be notified via email.
      </p>
      <button
        type="button"
        className="site-banner__close"
        aria-label="Dismiss site notice for 7 days"
        onClick={dismiss}
      >
        <IoClose />
      </button>
    </div>
  );

  return (
    <>
      <div ref={bannerRef} className="site-banner" role="status" aria-live="polite">
        {renderBannerContent()}
      </div>
      {compact ? (
        <div className="site-banner site-banner--compact-sticky" role="status" aria-live="polite">
          {renderBannerContent()}
        </div>
      ) : null}
    </>
  );
}

export default SiteBanner;
