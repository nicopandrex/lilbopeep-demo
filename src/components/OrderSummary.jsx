const BASE_PRICE = 54.95;

function calculateShipping(state, totalQuantity) {
  if (!state) return null;
  
  const stateUpper = state.toUpperCase().trim();
  const nonContinentalStates = ['AK', 'HI', 'PR'];
  
  // Determine base shipping rate: $5 for continental US, $15 for AK, HI, PR
  const isNonContinental = nonContinentalStates.includes(stateUpper);
  const baseRate = isNonContinental ? 15 : 5;
  
  // Double shipping for every 10 units
  const multiplier = Math.pow(2, Math.floor(totalQuantity / 10));
  
  return baseRate * multiplier;
}

function OrderSummary({ leftQuantity, rightQuantity, state, isLoadingShipping = false }) {
  const totalQuantity = leftQuantity + rightQuantity;
  const subtotal = BASE_PRICE * totalQuantity;
  const shipping = calculateShipping(state, totalQuantity);
  const total = shipping !== null ? subtotal + shipping : null;

  return (
    <aside className="order-summary">
      <h2>Order Summary</h2>
      <div className="summary-row">
        <span>Product</span>
        <span>The Lilbo Peepsite</span>
      </div>
      <div className="summary-row">
        <span>Price</span>
        <span>${BASE_PRICE.toFixed(2)} each</span>
      </div>
      {leftQuantity > 0 && (
        <div className="summary-row">
          <span>Left-Handed</span>
          <span>{leftQuantity}</span>
        </div>
      )}
      {rightQuantity > 0 && (
        <div className="summary-row">
          <span>Right-Handed</span>
          <span>{rightQuantity}</span>
        </div>
      )}
      <div className="summary-row summary-subtotal">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        {isLoadingShipping ? (
          <span className="skeleton-loader"></span>
        ) : (
          <span>{shipping !== null ? `$${shipping.toFixed(2)}` : 'Select state to calculate'}</span>
        )}
      </div>
      <div className="summary-total">
        <span>Total</span>
        {isLoadingShipping ? (
          <span className="skeleton-loader"></span>
        ) : (
          <span>{total !== null ? `$${total.toFixed(2)}` : `$${subtotal.toFixed(2)} + Shipping`}</span>
        )}
      </div>
    </aside>
  );
}

export default OrderSummary;
