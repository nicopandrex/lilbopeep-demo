function HandednessSelector({ value, onChange }) {
  const options = ['Left-handed', 'Right-handed'];

  return (
    <fieldset className="option-group">
      <legend>Handedness</legend>
      <div className="segmented-control" role="radiogroup" aria-label="Handedness">
        {options.map((option) => {
          const id = option.toLowerCase().replace(/\s+/g, '-');
          return (
            <label key={option} htmlFor={`handedness-${id}`} className="segmented-option">
              <input
                id={`handedness-${id}`}
                type="radio"
                name="handedness"
                value={option}
                checked={value === option}
                onChange={(event) => onChange(event.target.value)}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default HandednessSelector;
