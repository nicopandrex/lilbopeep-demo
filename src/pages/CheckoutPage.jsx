import { useState } from 'react';
import { useCart } from '../context/useCart.jsx';
import CheckoutForm from '../components/CheckoutForm.jsx';
import OrderSummary from '../components/OrderSummary.jsx';

function CheckoutPage() {
  const { cart } = useCart();
  const [stage, setStage] = useState('form');

  const handleSubmit = (nextOrder) => {
    console.log('Checkout order payload:', nextOrder);
    setStage('payment');
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Checkout</p>
          <h1>Secure checkout flow</h1>
          <p>No card details are collected on this site.</p>
        </div>

        {stage === 'form' ? (
          <div className="checkout-grid reveal">
            <CheckoutForm
              handedness={cart.handedness}
              quantity={cart.quantity}
              onSubmit={handleSubmit}
            />
            <OrderSummary handedness={cart.handedness} quantity={cart.quantity} />
          </div>
        ) : (
          <div className="payment-placeholder reveal">
            <h2>Secure Checkout with Stripe Coming soon.</h2>
            <p>Thanks for submitting your shipping information.</p>
            <button type="button" className="btn btn-secondary" onClick={() => setStage('form')}>
              Back to Checkout Form
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CheckoutPage;
