import React from "react";

const TokenList = ({ setSelectedTokenIndex, selectedTokenIndex, tokens }) => {
  return (
    <div className="mb-5 ml-5 flex w-full max-w-[1358px] cursor-pointer flex-wrap items-center justify-start gap-3 px-2 py-4 md:mb-10 lg:mb-28">
      {tokens?.map((token, index) => (
        <div
          key={index}
          className={`bg-[#000] bg-opacity-30 rounded-[12px] p-3 flex justify-between lg:w-[30%] md:w-[44%] w-[86%] hover:bg-opacity-60 ${
            selectedTokenIndex === index
              ? "border-[1.5px] border-[#00ff8c]"
              : ""
          }`}
          onClick={() => {
            setSelectedTokenIndex(index);
          }}
        >
          <div className="flex flex-col">
            <span className="leading-none">{token.symbol}</span>
            <span className="text-[12px] text-[#56B0B9]">{token.name}</span>
          </div>
          <span>{token.total_supply_formatted}</span>
        </div>
      ))}
    </div>
  );
};

export default TokenList;
