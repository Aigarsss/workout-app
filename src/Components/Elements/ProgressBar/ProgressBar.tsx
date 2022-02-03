import classNames from 'classnames';
import React from 'react';
import classes from './progressBar.scss';

export enum Color {
    Orange = 'orange',
    White = 'white',
    Green = 'green'
}

type ProgressBarProps = {
    width: number;
    color?: Color;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ width, color = Color.White }) => {
    return (
        <div className={classes.root}>
            <span style={{ width: `${width}%` }} className={classNames({ [classes[color]]: true })}></span>
        </div>
    );
};

export default ProgressBar;
