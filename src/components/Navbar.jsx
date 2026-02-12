import { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      const height = navRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty('--navbar-live-height', `${height}px`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <header ref={navRef} className="navbar-wrap">
      <div className="container navbar">
        <Link to="/" className="brand" aria-label="The Lilbo Peepsite home">
          The Lilbo Peepsite
        </Link>
        <nav aria-label="Main navigation">
          <ul className="nav-links">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/product">Product</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>
        <Link to="/checkout" className="btn btn-primary nav-cta">
          Order Now
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
