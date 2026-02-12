export function buildStripeCheckoutUrl(order) {
  const payload = encodeURIComponent(JSON.stringify(order));
  return `/stripe-checkout-placeholder?payload=${payload}`;
}
