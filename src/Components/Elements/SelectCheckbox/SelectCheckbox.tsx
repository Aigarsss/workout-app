import React from 'react';
import classes from './selectCheckbox.scss';

type SelectCheckboxProps = {
    id: string;
    label: string;
    onChange: any;
    disabled?: boolean;
    checked?: boolean;
};

const SelectCheckbox: React.FC<SelectCheckboxProps> = ({ id, onChange, label, disabled, checked }) => {
    return (
        <div className={classes.root}>
            <input
                type="checkbox"
                id={id}
                name={id}
                value={id}
                onChange={onChange}
                disabled={disabled}
                checked={checked}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

SelectCheckbox.defaultProps = {
    disabled: false,
    checked: false
};

export default SelectCheckbox;
