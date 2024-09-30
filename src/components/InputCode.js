import React, { useState, useRef, useEffect } from "react";

const InputCode = ({ numberOfInputs = 4, onComplete, onIncomplete }) => {
  const [code, setCode] = useState(new Array(numberOfInputs).fill(""));
  const inputsRef = useRef([]);

  useEffect(() => {
    // Check if the code is complete
    if (code.every((digit) => digit !== "")) {
      onComplete(code.join("")); // Call the onComplete callback with the full code
    } else if (code.some((digit) => digit === "")) {
      onIncomplete();
    }
  }, [code, onComplete, onIncomplete]);

  const handleChange = (e, index) => {
    const value = e.target.value.toUpperCase();
    if (/^[A-Z0-9]$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to the next input if available
      if (index < numberOfInputs - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];

      if (code[index] !== "") {
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
        newCode[index - 1] = "";
        setCode(newCode);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, numberOfInputs).toUpperCase().split("");
    if (pasteData.every((char) => /^[A-Z0-9]$/.test(char))) {
      setCode([...pasteData, ...code.slice(pasteData.length)]);
      if (pasteData.length >= numberOfInputs) {
        inputsRef.current[numberOfInputs - 1].focus();
      } else {
        inputsRef.current[pasteData.length].focus();
      }
    }
  };

  return (
    <div onPaste={handlePaste} className="flex space-x-2">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="bg-[#000] bg-opacity-30 rounded-lg outline-none text-center text-2xl w-12 h-12"
        />
      ))}
    </div>
  );
};

export default InputCode;
