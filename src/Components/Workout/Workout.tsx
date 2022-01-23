import { mockData } from '@App/MockApi/mockData';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Workout: React.FC = () => {
    const totalRounds = 2;
    const [currentRound, setCurrentRound] = useState(1);
    const [isBreak, setIsBreak] = useState(true);
    const roundLength = 10;
    const breakLength = 5;
    const [seconds, setSeconds] = useState(breakLength);

    useEffect(() => {
        const intervalCounter = setInterval(() => {
            // Check if timer needs to be stopped
            if (currentRound <= totalRounds) {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (isBreak) {
                        setSeconds(roundLength);
                    } else {
                        // Increment round on round start
                        setCurrentRound(currentRound + 1);
                        setSeconds(breakLength);
                    }

                    // Switch from break to round and the other way around
                    setIsBreak(!isBreak);
                }
            }

            clearInterval(intervalCounter);
        }, 1000);
        return () => {
            clearInterval(intervalCounter);
        };
    }, [currentRound, isBreak, seconds, totalRounds]);

    return (
        <div>
            <Link to="/">Home</Link>
            <div>Round {currentRound}</div>
            {isBreak ? <div>REST</div> : <div>WORK</div>}
            <div>Time left: {seconds} seconds</div>
            {currentRound > totalRounds && 'Workout over'}
        </div>
    );
};

export default Workout;
