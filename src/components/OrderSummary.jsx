const BASE_PRICE = 54.95;

function OrderSummary({ handedness, quantity }) {
  const subtotal = BASE_PRICE * quantity;

  return (
    <aside className="order-summary">
      <h2>Order Summary</h2>
      <div className="summary-row">
        <span>Item</span>
        <span>The Lilbo Peepsite</span>
      </div>
      <div className="summary-row">
        <span>Handedness</span>
        <span>{handedness}</span>
      </div>
      <div className="summary-row">
        <span>Quantity</span>
        <span>{quantity}</span>
      </div>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>calculated at checkout</span>
      </div>
      <p className="shipping-note">Shipping calculated at checkout (no free shipping).</p>
      <p className="summary-total">
        Total: ${BASE_PRICE.toFixed(2)} x {quantity} + shipping (calculated at payment)
      </p>
    </aside>
  );
}

export default OrderSummary;
