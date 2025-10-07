import s from "./Select.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Option {
    value: string | number;
    label: string;
}

interface SelectCustomProps {
    className?: string;
    label: string;
    options: Option[];
    value?: string | number;
    onChange?: React.Dispatch<React.SetStateAction<string | number>>;
}


export const SelectCustom = ({
    className,
    label,
    options,
    value,
    onChange,
}: SelectCustomProps) => {
    const handleChange = (event: SelectChangeEvent) => {
        if (onChange) {
            onChange(event.target.value as string | number);
        }
    };

    return (
        <FormControl
            fullWidth
            className={classNames(s.select, {}, [className])}
        >
            <Select
                className={s.selectChange}
                id={`${label}-select`}
                value={value || ""}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                    if (!selected) {
                        return <span className={s.placeholder}>{label}</span>;
                    }
                    return options.find(opt => opt.value === selected)?.label;
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};