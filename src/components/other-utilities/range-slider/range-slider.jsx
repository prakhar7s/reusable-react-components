import React, { useState } from "react";

const RangeSlider = () => {
  const [val, setVal] = useState(0);
  return (
    <div>
      <input
        id="slider"
        type="range"
        min="4"
        max="32"
        value={val}
        onChange={(e) => {
          setVal(val + 1);
        }}
      />
    </div>
  );
};

export default RangeSlider;
