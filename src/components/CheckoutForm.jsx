import { useMemo, useState } from 'react';

const US_STATES = [
  { value: '', label: 'Select a state...' },
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'PR', label: 'Puerto Rico' },
];

const COUNTRIES = [
  { value: 'US', label: 'United States' },
];

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
  const nonContinentalStates = ['AK', 'HI', 'PR'];
  
  // Determine base shipping rate: $5 for continental US, $15 for AK, HI, PR
  const isNonContinental = nonContinentalStates.includes(stateUpper);
  const baseRate = isNonContinental ? 15 : 5;
  
  // Double shipping for every 10 units
  const multiplier = Math.pow(2, Math.floor(totalQuantity / 10));
  
  return baseRate * multiplier;
}

function CheckoutForm({ leftQuantity, rightQuantity, onSubmit, onStateChange, isSubmitting = false, submitError = '' }) {
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
    country: 'US',
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
        <div className="form-field">
          <label htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            aria-invalid={Boolean(errors.state)}
            aria-describedby={errors.state ? 'state-error' : undefined}
          >
            {US_STATES.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          {errors.state ? (
            <p id="state-error" className="error-text">
              {errors.state}
            </p>
          ) : null}
        </div>
        {field('postalCode', 'Postal code')}
        <div className="form-field">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            aria-invalid={Boolean(errors.country)}
            aria-describedby={errors.country ? 'country-error' : undefined}
          >
            {COUNTRIES.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          {errors.country ? (
            <p id="country-error" className="error-text">
              {errors.country}
            </p>
          ) : null}
        </div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Place Pre-Order Request'}
      </button>
      {submitError ? <p className="error-text">{submitError}</p> : null}
    </form>
  );
}

export default CheckoutForm;
