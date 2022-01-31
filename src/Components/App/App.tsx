import React from 'react';
import './app.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '@App/Components/Home';
import Workout from '@App/Components/Workout';
import WorkoutContextProvider from '@App/Context/workoutContext';

const App: React.FC = () => {
    return (
        <WorkoutContextProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/workout" element={<Workout />} />
                </Routes>
            </Router>
        </WorkoutContextProvider>
    );
};

export default App;
