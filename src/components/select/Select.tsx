"use client";
import React, { useState } from "react";
import styles from "../select/css.module.css";
import { Option } from "@/helper/interface";
import { BsChevronDown } from "react-icons/bs";
interface SelectProps {
  options: Option[];
  onSelect: (value: string) => void;
}

export default function Select({ options, onSelect }: SelectProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);

  const handleOptionSelection = (option: Option) => {
    setShowOptions(false);
    setSelectedOption(option);
    onSelect(option.value);
  };

  return (
    <div className={styles.select_container}>
      <div
        className={styles.select_btn}
        onClick={() => setShowOptions(!showOptions)}
      >
        {
          <span>
            {selectedOption ? selectedOption.label : options[0].label}
          </span>
        }
        <BsChevronDown />
      </div>
      {showOptions && (
        <div className={styles.select_content}>
          {options.map((option, index) => {
            return (
              <div
                className={styles.option}
                key={index}
                onClick={() => handleOptionSelection(option)}
              >
                <span className={styles.option_text}>{option.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
