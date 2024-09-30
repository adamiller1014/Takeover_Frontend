import React from "react";
import { Icon } from "@iconify/react";

export default function ThresholdModal({
  showModal,
  setShowModal,
  optionGroup = [],
  setOptionGroup,
}) {
  const toggleOption = (groupIndex, optionIndex) => {
    // Create a deep copy of the optionGroups state
    const updatedGroups = optionGroup.map((group, gIndex) => {
      if (gIndex === groupIndex) {
        return {
          ...group,
          options: group.options.map((option, oIndex) => {
            if (oIndex === optionIndex) {
              return { ...option, show: !option.show }; // Toggle the show property
            }
            return option;
          }),
        };
      }
      return group;
    });

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
            {optionGroup.map((group, groupIndex) => (
              <div key={groupIndex}>
                <p className="text-xs font-bold uppercase tracking-widest text-[#56B0B9]">
                  {group.platform}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  {group.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      className={`flex items-center gap-2 p-2 font-bold rounded-lg transition duration-200 ${
                        option.show
                          ? "bg-[#00FF8C] text-black"
                          : "bg-black bg-opacity-30 hover:bg-opacity-50"
                      }`}
                      onClick={() => toggleOption(groupIndex, optionIndex)}
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
                  ))}
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
