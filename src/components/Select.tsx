"use client";
import React, { useState } from "react";
import { Option } from "@/helper/interface";
import { BsChevronDown } from "react-icons/bs";

interface SelectProps {
  options: Option[];
  onSelect: (value: string) => void;
  placeHolder?: string;
  defaultOptionIndex?: number;
  backgroundColor?: string;
}

export default function Select({
  options,
  onSelect,
  placeHolder = "Select...",
  defaultOptionIndex,
  backgroundColor = "bg-theme-primary",
}: SelectProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);

  const handleOptionSelection = (option: Option) => {
    setSelectedOption(option);
    setShowOptions(false);
    onSelect(option.value);
  };

  return (
    <div className="relative w-full  ">
      <div
        className={` ${backgroundColor} w-full flex items-center   justify-between border border-gray-300 rounded px-2 h-10 gap-1 cursor-pointer`}
        onClick={() => setShowOptions(!showOptions)}
      >
        {selectedOption ? (
          <span className="block max-w-90 whitespace-nowrap overflow-hidden text-ellipsis">
            {selectedOption.label}
          </span>
        ) : defaultOptionIndex !== undefined ? (
          <span className="block max-w-90 whitespace-nowrap overflow-hidden text-ellipsis">
            {options[defaultOptionIndex].label}
          </span>
        ) : (
          <span className=" block max-w-90 whitespace-nowrap overflow-hidden text-ellipsis  text-gray-500">
            {placeHolder}
          </span>
        )}
        <BsChevronDown
          className={` transition duration-300 ${
            showOptions ? "rotate-180" : "  "
          } `}
        />
      </div>
      {showOptions && (
        <div
          className={` ${backgroundColor} absolute  top-full  w-full border border-gray-400 rounded  z-10`}
        >
          {options.map((option, index) => {
            return (
              <div
                className="py-2 px-3 cursor-pointer"
                key={index}
                onClick={() => handleOptionSelection(option)}
              >
                <span className="  block max-w-[90%]  overflow-hidden overflow-ellipsis">
                  {option.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
