import React, { useState } from 'react';

const Checkbox = ({
  label = '',
  onChange = () => { },
  disabled = false,
  labelPosition = 'right',
  customClasses = '',
  checkboxClasses = '',
  labelClasses = '',
  initialChecked = false,
}) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  return (
    <div
      className={`flex cursor-pointer relative items-center ${labelPosition === 'left' ? 'flex-row-reverse' : ''} ${customClasses}`}
      onClick={() => {
        onChange(isChecked);
        setIsChecked(!isChecked);
      }}
    >
      <div>
        <span>
          <img
            src={isChecked ? `${process.env.PUBLIC_URL}/assets/icons/check-off.svg` : `${process.env.PUBLIC_URL}/assets/icons/check-on.svg`}
            alt="checkoff"
          />
        </span>
      </div>
      {label && (
        <label
          className={`ml-3 cursor-pointer ${labelPosition === 'left' ? 'mr-2' : 'ml-2'} ${disabled ? 'text-gray-400' : 'text-[#FFFFFF]'
            } ${labelClasses}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
