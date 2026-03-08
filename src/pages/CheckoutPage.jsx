import { useState } from 'react';
import { useCart } from '../context/useCart.jsx';
import CheckoutForm from '../components/CheckoutForm.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import HandednessSelector from '../components/HandednessSelector.jsx';

function CheckoutPage() {
  const { cart, setLeftQuantity, setRightQuantity } = useCart();
  const [stage, setStage] = useState('form');
  const [shippingState, setShippingState] = useState('');
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const totalQuantity = cart.leftQuantity + cart.rightQuantity;

  const handleStateChange = (state) => {
    setShippingState(state);
    if (state) {
      setIsCalculatingShipping(true);
      setTimeout(() => {
        setIsCalculatingShipping(false);
      }, 1000);
    }
  };

  const handleSubmit = async (nextOrder) => {
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://api.chescowebworks.com/public/forms/c76c1249-aae0-48d6-8c4d-d06ebe144ef8/submit',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nextOrder),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to submit preorder');
      }

      setStage('success');
    } catch (error) {
      console.error('Error submitting preorder:', error);
      setSubmitError('There was an error submitting your preorder. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            <h1>Pre Order Request</h1>
            <p>Once the product is back in production we will send you an order invoice via email</p>
        </div>

        {stage === 'form' ? (
          <div className="checkout-grid reveal">
            <CheckoutForm
              leftQuantity={cart.leftQuantity}
              rightQuantity={cart.rightQuantity}
              onSubmit={handleSubmit}
              onStateChange={handleStateChange}
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
            <div>
              <div className="checkout-quantity-section">
                <h3>Adjust Quantities</h3>
                <HandednessSelector 
                  leftValue={cart.leftQuantity} 
                  rightValue={cart.rightQuantity}
                  onLeftChange={setLeftQuantity}
                  onRightChange={setRightQuantity}
                />
              </div>
              <OrderSummary 
                leftQuantity={cart.leftQuantity} 
                rightQuantity={cart.rightQuantity}
                state={shippingState}
                isLoadingShipping={isCalculatingShipping}
              />
            </div>
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
