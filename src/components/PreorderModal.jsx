import { useState, useMemo } from 'react';

const requiredFields = [
  'firstName',
  'lastName',
  'email',
  'address1',
  'city',
  'state',
  'postalCode',
  'country',
];

function calculateShipping(state, totalQuantity) {
  if (!state) return 0;
  
  const stateUpper = state.toUpperCase().trim();
  const nonContinentalStates = ['AK', 'ALASKA', 'HI', 'HAWAII', 'PR', 'PUERTO RICO'];
  
  const isNonContinental = nonContinentalStates.some(s => stateUpper.includes(s) || s.includes(stateUpper));
  const baseRate = isNonContinental ? 15 : 5;
  
  const multiplier = Math.pow(2, Math.floor(totalQuantity / 10));
  
  return baseRate * multiplier;
}

function PreorderModal({ leftQuantity, rightQuantity, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuantity = leftQuantity + rightQuantity;
  const subtotal = useMemo(() => 54.95 * totalQuantity, [totalQuantity]);
  const shippingCost = useMemo(() => calculateShipping(formData.state, totalQuantity), [formData.state, totalQuantity]);
  const total = subtotal + shippingCost;

  const validate = () => {
    const nextErrors = {};

    requiredFields.forEach((field) => {
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
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    const orderData = {
      product: {
        name: 'The Lilbo Peepsite',
        price: 54.95,
        leftQuantity,
        rightQuantity,
        totalQuantity,
        subtotal,
        shippingCost,
        total,
      },
      shipping: formData,
    };

    try {
      await onSubmit(orderData);
    } catch (error) {
      console.error('Preorder submission error:', error);
      setErrors({ submit: 'Failed to submit preorder. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = (name, label, { type = 'text', optional = false } = {}) => (
    <div className="form-field">
      <label htmlFor={name}>
        {label}
        {optional ? ' (optional)' : ''}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] ? (
        <p id={`${name}-error`} className="error-text">
          {errors[name]}
        </p>
      ) : null}
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Complete Your Preorder</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="preorder-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Left-Handed:</span>
              <span>{leftQuantity}</span>
            </div>
            <div className="summary-row">
              <span>Right-Handed:</span>
              <span>{rightQuantity}</span>
            </div>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {formData.state && (
              <div className="summary-row">
                <span>Shipping:</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row summary-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <h3>Shipping Information</h3>
            <div className="form-grid">
              {field('firstName', 'First name')}
              {field('lastName', 'Last name')}
              {field('email', 'Email', { type: 'email' })}
              {field('phone', 'Phone', { type: 'tel', optional: true })}
              {field('address1', 'Address line 1')}
              {field('address2', 'Address line 2', { optional: true })}
              {field('city', 'City')}
              {field('state', 'State/Province')}
              {field('postalCode', 'Postal code')}
              {field('country', 'Country')}
            </div>
            
            {errors.submit && (
              <p className="error-text" style={{ marginTop: '1rem' }}>{errors.submit}</p>
            )}

            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Preorder'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PreorderModal;
