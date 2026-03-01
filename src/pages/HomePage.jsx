import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductSection from '../components/ProductSection.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import Testimonials from '../components/Testimonials.jsx';
import hero1 from '../assets/22-1.jpg';
import hero2 from '../assets/Images/_DP95177.jpg';
import hero3 from '../assets/Peep Final/Peep-1001.jpg';

const heroImages = [
  { src: hero1, alt: 'The Lilbo Peepsite installed on a bow' },
  { src: hero2, alt: 'The Lilbo Peepsite in field use' },
  { src: hero3, alt: 'The Lilbo Peepsite titanium construction' },
];

const credibilityItems = [
  {
    title: 'Built to Last',
    description: 'Built from durable titanium alloy for reliable, repeatable performance.',
  },
  {
    title: 'Unobstructed Field of View',
    description: 'A cleaner sight picture through the full shot sequence.',
  },
  {
    title: 'No Serving Required',
    description: 'Simple setup design that stays put without serving work.',
  },
  {
    title: 'Best In Low Light Conditions',
    description: 'No more second guessing your target at the moment of truth.',
  },
];

function HomePage() {
  const navigate = useNavigate();
  const [openCard, setOpenCard] = useState(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollToProduct = () => {
    const section = document.getElementById('product-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <section className="section hero">
        <div className="hero-visual reveal">
          {heroImages.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={index === currentHeroIndex ? 'hero-image' : ''}
            />
          ))}
          <div className="hero-overlay" />
          <div className="container hero-content">
            <div>
              <p className="eyebrow">Precision Archery Gear</p>
              <h1>The Revolutionary Peep Site for Serious Archers.</h1>
              <p className="hero-copy">
                For most archers, the most impactful, yet least expensive, piece of gear
                you will buy will be your peep sight. The Lilbo Peepsite will make a huge
                impact on your shooting accuracy, consistency and effectiveness.
              </p>
              <div className="button-row">
                <button type="button" className="btn btn-primary" onClick={scrollToProduct}>
                  View Product
                </button>
                <Link to="/contact" className="btn btn-secondary">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container reveal">
          <ul className="credibility-list" aria-label="Product credibility highlights">
            {credibilityItems.map((item, index) => {
              const isOpen = openCard === index;
              const panelId = `credibility-panel-${index}`;

              return (
                <li key={item.title} className={`credibility-card${isOpen ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="credibility-card__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenCard(isOpen ? null : index)}
                  >
                    <span>{item.title}</span>
                    <span className="credibility-card__icon" aria-hidden="true">
                      {isOpen ? '-' : '+'}
                    </span>
                  </button>
                  <p id={panelId} className="credibility-card__description">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ProductSection id="product-section" />
      <Testimonials />
      <HowItWorks />

      <section className="section cta-band">
        <div className="container cta-band__content reveal">
          <div>
            <p className="eyebrow">Take The Next Step</p>
            <h2>Ready to upgrade your sight picture?</h2>
          </div>
          <div className="button-row">
            <button type="button" className="btn btn-primary" onClick={() => navigate('/checkout')}>
              Go to Checkout
            </button>
            <Link to="/contact" className="btn btn-secondary">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
