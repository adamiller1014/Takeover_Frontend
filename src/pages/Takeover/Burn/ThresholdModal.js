import React from "react";
import { Icon } from "@iconify/react";

export default function ThresholdModal({
  showModal,
  setShowModal,
  optionGroup = {},
  setOptionGroup,
}) {
  const toggleOption = (platform, optionKey) => {
    // Create a deep copy of the optionGroups state
    const updatedGroups = {
      ...optionGroup,
      [platform]: {
        ...optionGroup[platform],
        [optionKey]: {
          ...optionGroup[platform][optionKey],
          show: !optionGroup[platform][optionKey].show, // Toggle the show property
        },
      },
    };

    // Update the state in the parent component
    setOptionGroup(updatedGroups);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300 ease-in-out z-10 ${
          showModal ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Modal */}
      <div
        className={`fixed inset-0 overflow-y-auto z-10 flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0 transition-all duration-300 ease-in-out ${
          showModal
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="relative rounded-lg bg-[#0D1F21] text-left shadow-xl sm:w-full sm:max-w-lg">
          <div className="flex flex-col gap-2 p-4">
            {Object.keys(optionGroup).map((platform) => (
              <div key={platform}>
                <p className="text-xs font-bold uppercase tracking-widest text-[#56B0B9]">
                  {platform === "twitterThresholds"
                    ? "Twitter"
                    : "TokenTakeover"}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  {Object.keys(optionGroup[platform]).map((key) => {
                    const option = optionGroup[platform][key];
                    return (
                      <button
                        key={key}
                        className={`flex items-center gap-2 p-2 font-bold rounded-lg transition duration-200 ${
                          option.show
                            ? "bg-[#00FF8C] text-black"
                            : "bg-black bg-opacity-30 hover:bg-opacity-50"
                        }`}
                        onClick={() => toggleOption(platform, key)}
                      >
                        {option.show ? (
                          <Icon
                            icon="hugeicons:checkmark-square-02"
                            width="1.5rem"
                            height="1.5rem"
                          />
                        ) : (
                          <Icon
                            icon="hugeicons:square"
                            width="1.5rem"
                            height="1.5rem"
                          />
                        )}
                        <span>{option.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="m-4 w-full">
            <button
              onClick={() => setShowModal(false)}
              className="cursor-pointer rounded-lg bg-green-500 bg-opacity-30 p-2 font-bold"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
