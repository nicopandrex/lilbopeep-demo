function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  return (
    <div className="option-group">
      <label htmlFor="quantity">Quantity</label>
      <div className="quantity-stepper">
        <button type="button" onClick={decrement} aria-label="Decrease quantity">
          -
        </button>
        <input
          id="quantity"
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(event) => {
            const next = Number.parseInt(event.target.value, 10);
            if (Number.isNaN(next)) {
              onChange(min);
              return;
            }
            onChange(Math.max(min, Math.min(max, next)));
          }}
        />
        <button type="button" onClick={increment} aria-label="Increase quantity">
          +
        </button>
      </div>
    </div>
  );
}

export default QuantityStepper;
