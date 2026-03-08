import { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};
    ['name', 'email', 'subject', 'message'].forEach((field) => {
      if (!formData[field].trim()) {
        nextErrors[field] = 'This field is required.';
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitError('');

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://api.chescowebworks.com/public/forms/6fae2996-8fff-40e7-9109-88824158f81e/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section">
      <div className="container contact-layout">
        <div className="section-head reveal">
          <p className="eyebrow">Contact</p>
          <h1>Contact Us</h1>
          <p>
            We would like to hear from you. Please send us a message by filling out
            the form below and we will get back with you shortly.
          </p>

          <div className="contact-details">
            <p>Pottstown, PA</p>
            <p>
              <a href="tel:6103348095">610-334-8095</a>
            </p>
            <p>
              <a href="mailto:jbuck7084@gmail.com">jbuck7084@gmail.com</a>
            </p>
          </div>
        </div>

        <form className="contact-form reveal" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={formData.name} onChange={handleChange} />
            {errors.name ? <p className="error-text">{errors.name}</p> : null}
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
            {errors.email ? <p className="error-text">{errors.email}</p> : null}
          </div>

          <div className="form-field">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" value={formData.subject} onChange={handleChange} />
            {errors.subject ? <p className="error-text">{errors.subject}</p> : null}
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} />
            {errors.message ? <p className="error-text">{errors.message}</p> : null}
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitError ? <p className="error-text">{submitError}</p> : null}

          {submitted ? (
            <p className="success-text">Thank you. Your message has been submitted.</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
