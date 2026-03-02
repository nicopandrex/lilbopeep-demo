const steps = [
  {
    title: 'Mark Your Anchor Point',
    description: 'Draw your bow back with eyes closed. At full draw with your anchor at the corner of your mouth, open your eyes. Have someone mark where your eye meets the string with a white paint marker - this aligns with point "A" on the peepsite.',
  },
  {
    title: 'Prepare the Bowstring',
    description: 'Use a bow press to loosen the string enough to create a small loop. Determine your hand preference: right hand installs slot to left, left hand installs slot to right.',
  },
  {
    title: 'Install the Peepsite',
    description: 'Align the marked spot with "A" on the peepsite. Feed the bowstring into the channel, working from one end to the other until all strands are neatly tucked. Pull tight, double-check alignment, then slowly re-tighten and remove from press.',
  },
  {
    title: 'Add Alignment Tubing',
    description: 'Tie a half hitch 1" from the tubing end. Thread through the top alignment loop, then tie the other end to a bow cable with a square knot. The peep should sit perpendicular to the string at full draw. Test and adjust as needed.',
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
          <div style={{ aspectRatio: '16/9', background: 'var(--surface-alt)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/ntL7FpI4kSA"
              title="Lilbo Peepsite Installation Guide"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: 'block' }}
            />
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
