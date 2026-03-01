const steps = [
  {
    title: 'Find Your Anchor Point',
    description: 'Draw your bow with eyes closed and anchor naturally. Open your eyes and mark where your eye centers on the string.',
  },
  {
    title: 'Press and Position',
    description: 'Place the bow in a press to relieve tension. Slide the Lilbo Peep around both sides of the string with the cutout facing your dominant eye.',
  },
  {
    title: 'Thread the Alignment Tube',
    description: 'Run the alignment tubing through the designated hole in the peep.',
  },
  {
    title: 'Test and Fine-Tune',
    description: 'Remove the bow from the press and test your sight picture. If needed, return to the press for micro-adjustments.',
  },
];

function HowItWorks() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Installation</p>
          <h2>Quick and Easy Setup</h2>
          <p>Get your Lilbo Peepsite installed and ready in minutes.</p>
        </div>
        
        <div className="reveal" style={{ maxWidth: '800px', margin: '0 auto 3rem', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '3rem 2rem', textAlign: 'center' }}>
          <div style={{ aspectRatio: '16/9', background: 'var(--surface-alt)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--line)' }}>
            <div>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600, color: 'var(--muted)' }}>Video Installation Guide</p>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: 'var(--muted)' }}>Coming Soon</p>
            </div>
          </div>
        </div>

        <div className="steps-grid reveal">
          {steps.map((step, index) => (
            <article key={step.title} className="step-card">
              <p className="step-number">{String(index + 1).padStart(2, '0')}</p>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
