import React from 'react';
import classes from './app.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '@App/Components/Home';
import Workout from '@App/Components/Workout';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/workout" element={<Workout />} />
            </Routes>
        </Router>
    );
};

export default App;
