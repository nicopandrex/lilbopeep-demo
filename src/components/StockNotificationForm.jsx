import { useState } from 'react';

function StockNotificationForm({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const data = new FormData(form);

      const gotcha = data.get('_gotcha');
      if (gotcha) {
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(
        'https://api.chescowebworks.com/public/forms/97e245aa-526a-42ed-9a96-a8455320b360/submit',
        {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        },
      );

      if (response.ok) {
        setEmail('');
        form.reset();
        onClose();
      } else {
        const result = await response.json().catch(() => null);
        const message =
          result?.errors?.[0]?.message || 'Failed to sign up. Please try again.';
        setError(message);
      }
    } catch (err) {
      console.error('Stock notification signup error:', err);
      setError('Failed to sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="stock-notification-form">
      <h3>Get Notified When Back in Stock</h3>
      <p className="stock-notification-description">
        Enter your email to receive a notification when The Lilbo Peepsite is available.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="stock-notification-input-group">
          <input
            type="email"
            placeholder="your.email@example.com"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            disabled={isSubmitting}
            className="stock-notification-input"
          />
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Notify Me'}
          </button>
        </div>
        {error && <p className="error-text">{error}</p>}
      </form>
      <button 
        type="button" 
        className="stock-notification-close" 
        onClick={onClose}
        disabled={isSubmitting}
      >
        Cancel
      </button>
    </div>
  );
}

export default StockNotificationForm;
