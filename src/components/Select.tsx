"use client";
import React, { useState } from "react";
import { Option } from "@/helper/interface";
import { BsChevronDown } from "react-icons/bs";

interface SelectProps {
  options: Option[];
  onSelect: (value: string) => void;
  placeHolder?: string;
  defaultOptionIndex?: number;
}

export default function Select({
  options,
  onSelect,
  placeHolder = "Select...",
  defaultOptionIndex,
}: SelectProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);

  const handleOptionSelection = (option: Option) => {
    setSelectedOption(option);
    setShowOptions(false);
    onSelect(option.value);
  };

  return (
    <div className="relative w-full">
      <div
        className="w-full flex items-center justify-between border border-gray-400 rounded px-2 h-10 cursor-pointer"
        onClick={() => setShowOptions(!showOptions)}
      >
        {selectedOption ? (
          <span>{selectedOption.label}</span>
        ) : defaultOptionIndex !== undefined ? (
          <span>{options[defaultOptionIndex].label}</span>
        ) : (
          <span className="text-gray-500">{placeHolder}</span>
        )}
        <BsChevronDown />
      </div>
      {showOptions && (
        <div className="absolute top-full w-full border border-gray-400 rounded bg-white z-10">
          {options.map((option, index) => {
            return (
              <div
                className="py-2 px-3 cursor-pointer"
                key={index}
                onClick={() => handleOptionSelection(option)}
              >
                <span>{option.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
