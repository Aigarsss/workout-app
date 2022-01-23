import { mockData } from '@App/MockApi/mockData';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Workout: React.FC = () => {
    const totalRounds = 2;
    const roundLength = 5;
    const breakLength = 2;
    const [currentRound, setCurrentRound] = useState(0);
    const [isBreak, setIsBreak] = useState(true);
    const [seconds, setSeconds] = useState(breakLength);
    const [isPaused, setIsPaused] = useState(false);

    const intervalCounter = setInterval(() => {
        // Check if timer needs to be stopped
        if (currentRound < totalRounds && !isPaused) {
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

    useEffect(() => {
        intervalCounter;
        return () => {
            clearInterval(intervalCounter);
        };
    }, [currentRound, intervalCounter, isBreak, seconds, totalRounds]);

    const pauseTimer = () => {
        clearInterval(intervalCounter);
        setIsPaused(true);
    };

    const resumeTimer = () => {
        setSeconds(seconds);
        setIsPaused(false);
    };

    const isWorkoutOver = currentRound === totalRounds;

    const workoutBody = (
        <div>
            {isPaused ? (
                <button onClick={() => resumeTimer()}>Resume</button>
            ) : (
                <button onClick={() => pauseTimer()}>Pause</button>
            )}
            <div>Round {currentRound + 1}</div>
            {isBreak ? <div>REST</div> : <div>WORK</div>}
            <div>Time left: {seconds} seconds</div>
            {isBreak && 'Next Excercise:'}
            <div>{mockData[currentRound].name}</div>
        </div>
    );

    const endedWorkoutBody = <div>Workout over</div>;

    return (
        <div>
            <Link to="/">Home</Link>
            {isWorkoutOver ? endedWorkoutBody : workoutBody}
        </div>
    );
};

export default Workout;
