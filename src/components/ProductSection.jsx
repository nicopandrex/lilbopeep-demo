import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/useCart.jsx';
import HandednessSelector from './HandednessSelector.jsx';
import QuantityStepper from './QuantityStepper.jsx';
import image11 from '../assets/11-1.jpg';
import imageAbout1 from '../assets/about1.jpg';
import imageAbout2 from '../assets/about2.jpg';
import imageHome2 from '../assets/home2.jpg';

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
    title: 'Low-Light Performance',
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
  { src: image11, name: '11-1', alt: 'Main product view of The Lilbo Peepsite' },
  { src: imageAbout1, name: 'about1', alt: 'The Lilbo Peepsite installed on a bowstring' },
  { src: imageAbout2, name: 'about2', alt: 'Close-up of The Lilbo Peepsite on the string' },
  { src: imageHome2, name: 'home2', alt: 'Bow view with The Lilbo Peepsite in focus' },
];

function ProductSection({ showIntro = false, id }) {
  const { cart, setHandedness, setQuantity } = useCart();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(productImages[0]);

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
            <div className="product-thumbs">
              {productImages.map((image) => (
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
          </div>

          <div className="product-content">
            <h2>The Lilbo Peepsite</h2>
            <p className="price">$54.95</p>
            <p className="shipping-note">Shipping calculated at checkout (no free shipping).</p>
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
              <HandednessSelector value={cart.handedness} onChange={setHandedness} />
              <QuantityStepper value={cart.quantity} onChange={setQuantity} />
            </div>

            <div className="button-row">
              <button type="button" className="btn btn-primary" onClick={() => navigate('/checkout')}>
                Checkout
              </button>
              <Link to="/contact" className="btn btn-secondary">
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
