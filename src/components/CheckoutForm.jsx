import { useMemo, useState } from 'react';

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
  
  // Determine base shipping rate
  const isNonContinental = nonContinentalStates.some(s => stateUpper.includes(s) || s.includes(stateUpper));
  const baseRate = isNonContinental ? 15 : 5;
  
  // Double shipping for every 10 units
  const multiplier = Math.pow(2, Math.floor(totalQuantity / 10));
  
  return baseRate * multiplier;
}

function CheckoutForm({ leftQuantity, rightQuantity, onSubmit, onStateChange }) {
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

  const totalQuantity = leftQuantity + rightQuantity;
  const subtotal = useMemo(() => 54.95 * totalQuantity, [totalQuantity]);

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
    
    // Update shipping calculation when state changes
    if (name === 'state' && onStateChange) {
      onStateChange(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const shippingCost = calculateShipping(formData.state, totalQuantity);
    const total = subtotal + shippingCost;

    onSubmit({
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
      shipping: {
        ...formData,
      },
    });
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
    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
      <h2>Shipping Details</h2>
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
      <button type="submit" className="btn btn-primary">
        Complete Preorder
      </button>
    </form>
  );
}

export default CheckoutForm;
