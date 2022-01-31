import React, { ChangeEvent } from 'react';
import classes from './select.scss';
// import  CircleChevronDown from './static/circleChevronDown.svg';

type SelectProps = {
    label: string;
    items: Array<any>;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    defaultValue: any;
    fieldName: string;
};

const Select: React.FC<SelectProps> = ({ label, items, onChange, defaultValue, fieldName }) => {
    return (
        <div className={classes.root}>
            <label htmlFor={fieldName}> {label} </label>
            <select id={fieldName} name={fieldName} onChange={onChange} value={defaultValue}>
                {items.map((item) => (
                    <option value={item.value} key={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
            <span className={classes.customArrow}>{/* <CircleChevronDown/> */}</span>
        </div>
    );
};

export default Select;
