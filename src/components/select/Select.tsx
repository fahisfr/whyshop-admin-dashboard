import React, { useState } from "react";
import styles from "../select/css.module.css";
import { Option } from "@/helper/interface";
import { BsChevronDown } from "react-icons/bs";
interface SelectProps {
  options: Option[];
  placeHolder?: string;
  onSelect: (value: string) => void;
}

export default function Select({
  options,
  onSelect,
  placeHolder,
}: SelectProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionSelection = (option: string) => {
    setShowOptions(false);
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div className={styles.select_container}>
      <div
        className={styles.select_btn}
        onClick={() => setShowOptions(!showOptions)}
      >
        {selectedOption ? <span>{selectedOption}</span> : <span>Select..</span>}
        <BsChevronDown />
      </div>
      {showOptions && (
        <div className={styles.select_content}>
          {options.map((option, index) => {
            return (
              <div
                className={styles.option}
                key={index}
                onClick={() => handleOptionSelection(option.value)}
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
