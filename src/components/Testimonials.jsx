const highlights = [
  {
    text: "The setup was incredibly straightforward. Within minutes, I had the alignment accurate and was ready to send arrows downrange",
  },
  {
    text: "The peep stays anchored in place. Once installed, you simply don't have to babysit it like a traditional peep",
  },
  {
    text: "The difference was most apparent in low-light tests, where the open-side design let me pick up my target faster",
  },
];

function Testimonials() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Expert Review</p>
          <h2>Featured in North American Bow Hunter</h2>
          <p>Real-world testing from experienced bowhunters in the field.</p>
        </div>
        <div className="testimonial-grid reveal">
          {highlights.map((highlight) => (
            <blockquote key={highlight.text} className="highlight-quote">
              <p className="highlight-text">"{highlight.text}"</p>
              <cite className="highlight-attribution">— Ryan Fair, North American Bow Hunter (Dec 3, 2025)</cite>
            </blockquote>
          ))}
        </div>
        <div className="reveal" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a 
            href="https://nabowhunter.com/lilbo-peep-site-review/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary"
          >
            Read the Full Review
          </a>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
