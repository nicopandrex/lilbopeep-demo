const steps = [
  {
    title: 'Choose handedness + quantity',
    description: 'Set your setup preferences before checkout.',
  },
  {
    title: 'Enter shipping details',
    description: 'Provide your delivery information in a single form.',
  },
  {
    title: 'Pay securely via Stripe Checkout (coming soon)',
    description: 'Payment redirect will be connected to Stripe next.',
  },
  {
    title: "We'll confirm your order by email",
    description: 'You will receive confirmation details after payment.',
  },
];

function HowItWorks() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">How It Works</p>
          <h2>Simple checkout. Built for fast ordering.</h2>
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
