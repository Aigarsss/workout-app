import React, { ChangeEvent } from 'react';
import classes from './select.scss';
import CircleChevronDown from './static/circleChevronDown.svg';

type SelectProps = {
    label: string;
    items: Array<{
        label: string;
        value: string | number;
    }>;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    defaultValue: string | number;
    fieldName: string;
};

const Select: React.FC<SelectProps> = ({ label, items, onChange, defaultValue, fieldName }) => {
    return (
        <div className={classes.root}>
            <label htmlFor={fieldName}>{label}</label>
            <span className={classes.inputContainer}>
                <select id={fieldName} name={fieldName} onChange={onChange} value={defaultValue}>
                    {items.map((item) => (
                        <option value={item.value} key={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <span className={classes.customArrow}>
                    <CircleChevronDown />
                </span>
            </span>
        </div>
    );
};

export default Select;
