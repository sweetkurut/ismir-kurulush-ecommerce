import React, { InputHTMLAttributes, forwardRef, memo } from 'react';
import s from './Input.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    autofocus?: boolean;
    icon?: React.ReactNode;
    width?: string | number;
}

export const Input = memo(
    forwardRef<HTMLInputElement, InputProps>((props, ref) => {
        const {
            className,
            value,
            onChange,
            type = 'text',
            placeholder,
            icon,
            width,
            ...otherProps
        } = props;

        return (
            <div className={classNames(s.inputWrapper, {}, [className])} style={{ width }}>
                <input
                    className={classNames(s.Input, {}, [])}
                    placeholder={placeholder}
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChange}
                    {...otherProps}
                />
                {icon && <div className={s.iconWrapper}>{icon}</div>}
            </div>
        );
    })
);
