export const InputBox = ({ label, className = "", children }) => {
  return (
    <div
      className={`flex flex-col items-baseline justify-between py-2 text-[14px] sm:items-baseline lg:flex-row lg:items-center ${className}`}
    >
      <label className="">{label}</label>
      {children}
    </div>
  );
};

export const InputText = ({
  value,
  onChange,
  placeholder,
  className,
  error,
}) => {
  return (
    <div className="flex flex-col w-[98%] lg:w-[65%]">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`rounded-md border bg-[#111827] px-[13px] py-2 ${
          error ? "border-red-500" : "border-[#047857]"
        } ${className}`}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};
