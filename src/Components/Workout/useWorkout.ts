import { useWorkoutContext } from '@App/Context/workoutContext';
import { useEffect, useState } from 'react';

type UseWorkout = {
    isPaused: boolean;
    isBreak: boolean;
    currentRound: number;
    seconds: number;
    resumeTimer: () => void;
    pauseTimer: () => void;
    isWorkoutOver: boolean;
    totalRounds: number;
    totalSeconds: number;
};

export const useWorkout = (): UseWorkout => {
    const { formData } = useWorkoutContext();
    const { breakLength, roundLength, totalRounds } = formData;
    const [currentRound, setCurrentRound] = useState(0);
    const [isBreak, setIsBreak] = useState(true);
    const [seconds, setSeconds] = useState(breakLength);
    const [isPaused, setIsPaused] = useState(false);
    const [isWorkoutOver, setIsWorkoutOver] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(
        formData.totalRounds * formData.roundLength + formData.totalRounds * formData.breakLength
    );

    const intervalCounter = setInterval(() => {
        // Check if timer needs to be stopped
        if (currentRound < totalRounds && !isPaused && !isWorkoutOver) {
            if (seconds > 1) {
                setSeconds(seconds - 1);
            }
            if (seconds === 1) {
                if (isBreak) {
                    setSeconds(roundLength);
                } else {
                    // If final round, set workout over, else increment round
                    if (currentRound == totalRounds - 1) {
                        setIsWorkoutOver(true);
                    } else {
                        setCurrentRound(currentRound + 1);
                    }
                    setSeconds(breakLength);
                }

                // Switch from break to round and the other way around
                setIsBreak(!isBreak);
            }
            setTotalSeconds((prevVal) => prevVal - 1);
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

    return {
        isPaused,
        isBreak,
        currentRound,
        seconds,
        resumeTimer,
        pauseTimer,
        isWorkoutOver,
        totalRounds,
        totalSeconds
    };
};
