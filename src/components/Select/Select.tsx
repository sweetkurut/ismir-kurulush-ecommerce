import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import s from "./select.module.scss";

interface SelectOption {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: SelectOption[];
    defaultValue?: string;
    placeholder?: string;
    onSelect: (value: string) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    defaultValue,
    placeholder = "Выберите опцию",
    onSelect,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(() => {
        return defaultValue ? options.find((option) => option.value === defaultValue) || null : null;
    });

    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: SelectOption) => {
        setSelectedOption(option);
        onSelect(option.value);
        setIsOpen(false);
    };

    return (
        <div className={`${s.customSelect} ${isOpen ? s.open : ""}`} ref={selectRef}>
            <button type="button" className={s.selectHeader} onClick={handleToggle}>
                <span className={s.selectedText}>{selectedOption ? selectedOption.label : placeholder}</span>
                <FiChevronDown className={`${s.arrowIcon} ${isOpen ? s.arrowUp : ""}`} />
            </button>

            {isOpen && (
                <ul className={s.optionsList}>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`${s.optionItem} ${
                                selectedOption?.value === option.value ? s.selected : ""
                            }`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
