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

function CheckoutForm({ handedness, quantity, onSubmit }) {
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

  const subtotal = useMemo(() => (54.95 * quantity).toFixed(2), [quantity]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      product: {
        name: 'The Lilbo Peepsite',
        price: 54.95,
        handedness,
        quantity,
        subtotal,
      },
      shipping: {
        ...formData,
        shippingNote: 'Shipping calculated at checkout (no free shipping).',
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
        Continue to Payment
      </button>
    </form>
  );
}

export default CheckoutForm;
