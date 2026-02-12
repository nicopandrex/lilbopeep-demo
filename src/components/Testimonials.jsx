const quotes = [
  {
    text: 'The field of view is clean through the full shot process. That confidence matters.',
    author: 'Local Archer',
  },
  {
    text: 'No serving required and it stays where it belongs. Setup is straightforward.',
    author: 'Bowhunter',
  },
  {
    text: 'Low-light sessions are where I notice the difference the most.',
    author: 'Target Shooter',
  },
];

function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Testimonials</p>
          <h2>Trusted by archers who value consistency.</h2>
        </div>
        <div className="testimonial-grid reveal">
          {quotes.map((quote) => (
            <blockquote key={quote.text} className="testimonial-card">
              <p>"{quote.text}"</p>
              <cite>{quote.author}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
