import React from "react";

const SetProjectBUrnThresholdInput = ({val, onChange}) => {
  return (
    <input className="border-b w-20 bg-black bg-opacity-60 text-center border-[#00ff91] px-1" type="number" value={val} onChange={onChange} style={{ 
      // Hide the spinners in most browsers
      appearance: 'textfield',
      MozAppearance: 'textfield',
      WebkitAppearance: 'none',
      // Additional styling for padding or margin as needed
    }}/>
    
  )
}

export default SetProjectBUrnThresholdInput;