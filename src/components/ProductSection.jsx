import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/useCart.jsx';
import HandednessSelector from './HandednessSelector.jsx';
import StockNotificationForm from './StockNotificationForm.jsx';
import peep1003 from '../assets/Peep Final/Peep-1003.jpg';
import peep1004 from '../assets/Peep Final/Peep-1004.jpg';
import peep1005 from '../assets/Peep Final/Peep-1005.jpg';
import dp97397 from '../assets/_DP97397.jpg';
import dp97397s from '../assets/_DP97397S.jpg';
import dp97387 from '../assets/_DP97387.jpg';
import dp97387s from '../assets/_DP97387S.jpg';
import dp97409 from '../assets/_DP97409.jpg';
import dp97409s from '../assets/_DP97409S.jpg';

const features = [
  {
    title: 'Built to Last',
    description: 'Built from a 3D-printed titanium alloy.',
  },
  {
    title: '100% Unobstructed Field of View',
    description:
      'Designed to bend the entire bowstring around the aperture for a fully unobstructed view throughout the shot process.',
  },
  {
    title: 'No Serving Required',
    description: 'Will not creep. Period.',
  },
  {
    title: 'Best in Low Light Conditions',
    description: 'Unmatched in low light conditions.',
  },
  {
    title: 'Kill-Shot Confidence',
    description: 'Never second guess your target at the moment of truth.',
  },
  {
    title: 'Fits Left and Right-Handed Archers',
    description: 'Accommodates both left and right-handed archers.',
  },
];

const productImages = [
  { src: dp97397, name: 'dp97397', alt: 'The Lilbo Peepsite - product view' },
  { src: dp97397s, name: 'dp97397s', alt: 'The Lilbo Peepsite - alternate view' },
  { src: dp97387, name: 'dp97387', alt: 'The Lilbo Peepsite - detail view' },
  { src: dp97387s, name: 'dp97387s', alt: 'The Lilbo Peepsite - detail alternate view' },
  { src: peep1003, name: 'peep-1003', alt: 'The Lilbo Peepsite with alignment tool on bowstring' },
  { src: peep1004, name: 'peep-1004', alt: 'The Lilbo Peepsite alignment tool detail' },
  { src: peep1005, name: 'peep-1005', alt: 'The Lilbo Peepsite installation view' },
  { src: dp97409, name: 'dp97409', alt: 'The Lilbo Peepsite - installation angle' },
  { src: dp97409s, name: 'dp97409s', alt: 'The Lilbo Peepsite - close-up detail' },
];

function ProductSection({ showIntro = false, id }) {
  const { cart, setLeftQuantity, setRightQuantity } = useCart();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(productImages[0]);
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [thumbStartIndex, setThumbStartIndex] = useState(0);
  const [thumbsPerPage, setThumbsPerPage] = useState(5);

  // Adjust thumbs per page based on screen size
  useEffect(() => {
    const updateThumbsPerPage = () => {
      if (window.innerWidth <= 760) {
        setThumbsPerPage(3);
      } else {
        setThumbsPerPage(5);
      }
    };

    updateThumbsPerPage();
    window.addEventListener('resize', updateThumbsPerPage);
    return () => window.removeEventListener('resize', updateThumbsPerPage);
  }, []);

  const totalQuantity = cart.leftQuantity + cart.rightQuantity;
  const visibleThumbs = productImages.slice(thumbStartIndex, thumbStartIndex + thumbsPerPage);
  
  const currentImageIndex = productImages.findIndex(img => img.name === activeImage.name);
  const canScrollLeft = currentImageIndex > 0;
  const canScrollRight = currentImageIndex < productImages.length - 1;

  const scrollThumbsLeft = () => {
    if (currentImageIndex > 0) {
      const newImage = productImages[currentImageIndex - 1];
      setActiveImage(newImage);
      
      // Update thumbnail window if needed to keep active image visible
      if (currentImageIndex - 1 < thumbStartIndex) {
        setThumbStartIndex(currentImageIndex - 1);
      }
    }
  };

  const scrollThumbsRight = () => {
    if (currentImageIndex < productImages.length - 1) {
      const newImage = productImages[currentImageIndex + 1];
      setActiveImage(newImage);
      
      // Update thumbnail window if needed to keep active image visible
      if (currentImageIndex + 1 >= thumbStartIndex + thumbsPerPage) {
        setThumbStartIndex(currentImageIndex + 1 - thumbsPerPage + 1);
      }
    }
  };

  const handleNotificationSubmit = async (data) => {
    // TODO: Replace this with your actual API endpoint
    const API_ENDPOINT = '/api/stock-notification'; // Update with your API URL
    
    console.log('Submitting stock notification signup:', data);
    
    // Example API call structure - replace with your actual implementation
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to sign up for notifications');
    }

    // Success
    alert('Successfully signed up for stock notifications!');
  };

  return (
    <section className="section" id={id}>
      <div className="container">
        {showIntro ? (
          <div className="section-head reveal">
            <p className="eyebrow">Product</p>
            <h1>The Lilbo Peepsite</h1>
            <p>
              Built for serious archers who want a cleaner sight picture and repeatable
              shot execution.
            </p>
          </div>
        ) : null}

        <div className="product-grid reveal">
          <div className="product-gallery" aria-label="Product image gallery">
            <div className="product-main-image">
              <img src={activeImage.src} alt={activeImage.alt} />
            </div>
            <div className="product-thumbs-container">
              <button
                type="button"
                className="thumb-nav-button thumb-nav-left"
                onClick={scrollThumbsLeft}
                disabled={!canScrollLeft}
                aria-label="Show previous thumbnails"
              >
                &#8249;
              </button>
              <div className="product-thumbs">
                {visibleThumbs.map((image) => (
                  <button
                    key={image.name}
                    type="button"
                    className={`thumb-button${activeImage.name === image.name ? ' is-active' : ''}`}
                    onClick={() => setActiveImage(image)}
                    aria-label={`View ${image.alt}`}
                    aria-pressed={activeImage.name === image.name}
                  >
                    <img src={image.src} alt={image.alt} />
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="thumb-nav-button thumb-nav-right"
                onClick={scrollThumbsRight}
                disabled={!canScrollRight}
                aria-label="Show next thumbnails"
              >
                &#8250;
              </button>
            </div>
          </div>

          <div className="product-content">
            <div className="product-header">
              <div>
                <h2>The Lilbo Peepsite</h2>
                <p className="price">$54.95</p>
              </div>
              <div className="made-in-usa-product-badge">
                ★ Made in the USA ★
              </div>
            </div>
            <p className="shipping-note">Shipping cost calculated at checkout</p>
            <h3 className="feature-heading">Why Archers Choose The Lilbo Peepsite</h3>
            <div className="feature-list">
              {features.map((feature) => (
                <article key={feature.title} className="feature-item">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>

            <div className="product-options">
              <HandednessSelector 
                leftValue={cart.leftQuantity} 
                rightValue={cart.rightQuantity}
                onLeftChange={setLeftQuantity}
                onRightChange={setRightQuantity}
              />
            </div>

            {showNotificationForm ? (
              <StockNotificationForm
                isOpen={showNotificationForm}
                onClose={() => setShowNotificationForm(false)}
                onSubmit={handleNotificationSubmit}
              />
            ) : (
              <div className="button-stack">
                <button 
                  type="button" 
                  className="btn btn-primary btn-block" 
                  onClick={() => navigate('/checkout')}
                  disabled={totalQuantity === 0}
                >
                  Reserve Your Order
                </button>
                <p className="payment-note">No payment required now. We'll send an invoice when the product is ready.</p>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-block" 
                  onClick={() => setShowNotificationForm(true)}
                >
                  Get Stock Notifications
                </button>
                <Link to="/contact" className="btn btn-secondary btn-block">
                  Ask a Question
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
