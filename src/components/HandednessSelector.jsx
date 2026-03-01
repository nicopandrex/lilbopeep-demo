function HandednessSelector({ leftValue, rightValue, onLeftChange, onRightChange, min = 0, max = 99 }) {
  const decrementLeft = () => onLeftChange(Math.max(min, leftValue - 1));
  const incrementLeft = () => onLeftChange(Math.min(max, leftValue + 1));
  const decrementRight = () => onRightChange(Math.max(min, rightValue - 1));
  const incrementRight = () => onRightChange(Math.min(max, rightValue + 1));

  const handleInputChange = (value, onChange) => {
    const next = Number.parseInt(value, 10);
    if (Number.isNaN(next)) {
      onChange(min);
      return;
    }
    onChange(Math.max(min, Math.min(max, next)));
  };

  return (
    <fieldset className="option-group">
      <legend>Quantity by Handedness</legend>
      
      <div className="handedness-quantities">
        <div className="handedness-quantity-item">
          <label htmlFor="left-quantity">Left-handed</label>
          <div className="quantity-stepper">
            <button type="button" onClick={decrementLeft} aria-label="Decrease left-handed quantity">
              -
            </button>
            <input
              id="left-quantity"
              type="number"
              min={min}
              max={max}
              value={leftValue}
              onChange={(event) => handleInputChange(event.target.value, onLeftChange)}
            />
            <button type="button" onClick={incrementLeft} aria-label="Increase left-handed quantity">
              +
            </button>
          </div>
        </div>

        <div className="handedness-quantity-item">
          <label htmlFor="right-quantity">Right-handed</label>
          <div className="quantity-stepper">
            <button type="button" onClick={decrementRight} aria-label="Decrease right-handed quantity">
              -
            </button>
            <input
              id="right-quantity"
              type="number"
              min={min}
              max={max}
              value={rightValue}
              onChange={(event) => handleInputChange(event.target.value, onRightChange)}
            />
            <button type="button" onClick={incrementRight} aria-label="Increase right-handed quantity">
              +
            </button>
          </div>
        </div>
      </div>
    </fieldset>
  );
}

export default HandednessSelector;
