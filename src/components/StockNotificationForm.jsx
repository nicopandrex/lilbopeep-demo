import { useState } from 'react';

function StockNotificationForm({ isOpen, onClose, onSubmit }) {
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
      await onSubmit({ email });
      setEmail('');
      onClose();
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
