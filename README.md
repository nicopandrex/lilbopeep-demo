# The Lilbo Peepsite Redesign

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Stripe URL stub

Edit `src/utils/stripe.js` and update `buildStripeCheckoutUrl(order)`.

Current behavior:
- Returns a placeholder URL with serialized payload.
- Checkout page logs the order object to the browser console.
- `/checkout` switches to a payment placeholder state with the order JSON.
