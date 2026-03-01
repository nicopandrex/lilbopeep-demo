import { useState } from 'react';
import { useCart } from '../context/useCart.jsx';
import CheckoutForm from '../components/CheckoutForm.jsx';
import OrderSummary from '../components/OrderSummary.jsx';

function CheckoutPage() {
  const { cart } = useCart();
  const [stage, setStage] = useState('form');
  const [shippingState, setShippingState] = useState('');
  const totalQuantity = cart.leftQuantity + cart.rightQuantity;

  const handleSubmit = async (nextOrder) => {
    console.log('Checkout order payload:', nextOrder);
    
    // TODO: Replace with your actual API endpoint
    // const API_ENDPOINT = '/api/preorder';
    // try {
    //   const response = await fetch(API_ENDPOINT, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(nextOrder),
    //   });
    //   if (!response.ok) throw new Error('Failed to submit preorder');
    // } catch (error) {
    //   console.error('Error submitting preorder:', error);
    //   alert('There was an error submitting your preorder. Please try again.');
    //   return;
    // }
    
    setStage('success');
  };

  if (totalQuantity === 0) {
    return (
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Checkout</p>
            <h1>Your cart is empty</h1>
            <p>Please add items to your cart before checking out.</p>
          </div>
        </div>
      </section>
    );
  }

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
              leftQuantity={cart.leftQuantity}
              rightQuantity={cart.rightQuantity}
              onSubmit={handleSubmit}
              onStateChange={setShippingState}
            />
            <OrderSummary 
              leftQuantity={cart.leftQuantity} 
              rightQuantity={cart.rightQuantity}
              state={shippingState}
            />
          </div>
        ) : (
          <div className="payment-placeholder reveal">
            <h2>Preorder Submitted Successfully!</h2>
            <p>You will receive an order invoice via email once the product is in stock.</p>
            <button type="button" className="btn btn-primary" onClick={() => window.location.href = '/'}>
              Return to Home
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default CheckoutPage;
