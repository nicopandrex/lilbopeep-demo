import { useMemo, useState } from 'react';
import { useCart } from '../context/useCart.jsx';
import CheckoutForm from '../components/CheckoutForm.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import { buildStripeCheckoutUrl } from '../utils/stripe.js';

function CheckoutPage() {
  const { cart } = useCart();
  const [stage, setStage] = useState('form');
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [order, setOrder] = useState(null);

  const orderPreview = useMemo(
    () => ({
      product: {
        name: 'The Lilbo Peepsite',
        price: 54.95,
        handedness: cart.handedness,
        quantity: cart.quantity,
      },
      shipping: 'Shipping calculated at checkout (no free shipping).',
    }),
    [cart.handedness, cart.quantity],
  );

  const handleSubmit = (nextOrder) => {
    const fullOrder = {
      ...nextOrder,
      meta: {
        shippingStatus: 'calculated at checkout',
      },
    };

    const url = buildStripeCheckoutUrl(fullOrder);
    console.log('Checkout order payload:', fullOrder);
    setOrder(fullOrder);
    setCheckoutUrl(url);
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
            <h2>Stripe Checkout will open here once integrated.</h2>
            <p>
              Placeholder URL from <code>buildStripeCheckoutUrl(order)</code>:
            </p>
            <pre>{checkoutUrl}</pre>
            <p>Order payload:</p>
            <pre>{JSON.stringify(order ?? orderPreview, null, 2)}</pre>
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
