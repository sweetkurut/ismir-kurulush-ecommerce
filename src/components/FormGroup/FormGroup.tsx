import s from "./style.module.scss";

interface SelectOption {
    label: string;
    value: string | number;
}

export const FormGroup = ({
    label,
    type = "text",
    placeholder,
    required = false,
    isSelect = false,
    options = [],
    value,
    onChange,
    name,
}: {
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    isSelect?: boolean;
    options?: SelectOption[];
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    name?: string;
}) => (
    <div className={s.form_group}>
        <label className={s.form_label}>
            {label} {required && <span>*</span>}
        </label>

        {isSelect ? (
            <select className={s.form_input} name={name} value={value ?? ""} onChange={onChange} required={required}>
                <option value="" disabled>
                    Выберите тип заявки
                </option>

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        ) : type === "textarea" ? (
            <textarea
                className={s.form_textarea}
                placeholder={placeholder}
                rows={4}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            />
        ) : (
            <input
                className={s.form_input}
                type={type}
                placeholder={placeholder}
                required={required}
                name={name}
                value={value}
                onChange={onChange}
            />
        )}
    </div>
);
