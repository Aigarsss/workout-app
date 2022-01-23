import { mockData } from '@App/MockApi/mockData';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Workout: React.FC = () => {
    const [time, setTime] = useState<number>(0);
    const rounds = 3;
    const roundTime = 5;
    const restTime = 2;

    const workout = {
        rounds: 3,
        roundTime: 5,
        restTime: 2,
        excercises: mockData
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div>
            <Link to="/">Home</Link>
            <div>Round: {1}</div>
            <div>Rest: {1} seconds</div>
            <div>Round time left: {1} seconds</div>
        </div>
    );
};

export default Workout;
