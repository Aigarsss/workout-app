import Button from '@App/Components/Button';
import React from 'react';
import classes from './app.scss';


const App: React.FC = () => {
    return (
        <>
            <h3 className={classes.test}>Welcome to react boilerplate</h3>
            <Button />
        </>
    )

};

export default App;
