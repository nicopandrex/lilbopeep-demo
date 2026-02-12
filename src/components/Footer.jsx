import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid footer-grid--columns">
        <div className="footer-col">
          <h3 className="footer-label">Brand</h3>
          <p className="footer-brand">The Lilbo Peepsite</p>
        </div>

        <div className="footer-col">
          <h3 className="footer-label">Contact</h3>
          <p>
            Phone: <a href="tel:6103348095">610-334-8095</a>
          </p>
          <p>
            Email: <a href="mailto:jbuck7084@gmail.com">jbuck7084@gmail.com</a>
          </p>
        </div>

        <div className="footer-col">
          <h3 className="footer-label">Address</h3>
          <p>Pottstown, PA</p>
        </div>

        <div className="footer-col">
          <h3 className="footer-label">Hours</h3>
          <p>Mon-Fri: 9am-5pm</p>
        </div>

        <div className="footer-col footer-cta-wrap">
          <h3 className="footer-label">Ready to Start?</h3>
          <Link to="/contact" className="btn btn-primary footer-cta-btn">
            Contact
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} The Lilbo Peepsite. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
