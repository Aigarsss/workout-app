import React from 'react';
import classes from './loader.scss';

const Loader: React.FC = () => {
    return (
        <div className={classes.root}>
            <span className={classes.loader} />
        </div>
    );
};

export default Loader;
