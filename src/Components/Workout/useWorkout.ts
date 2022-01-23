import { useEffect, useState } from 'react';

type UseWorkout = {
    isPaused: boolean;
    isBreak: boolean;
    currentRound: number;
    seconds: number;
    resumeTimer: () => void;
    pauseTimer: () => void;
    isWorkoutOver: boolean;
};

export const useWorkout = (): UseWorkout => {
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

    return {
        isPaused,
        isBreak,
        currentRound,
        seconds,
        resumeTimer,
        pauseTimer,
        isWorkoutOver
    };
};
