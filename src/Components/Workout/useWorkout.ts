import { useWorkoutContext } from '@App/Context/workoutContext';
import { ApiData } from '@App/MockApi/mockData';
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
    workoutProgram: Array<ApiData>;
};

type StorageData = {
    isPaused: boolean;
    isBreak: boolean;
    isWorkoutOver: boolean;
    currentRound: number;
    seconds: number;
    totalSeconds: number;
    totalRounds: number;
    workoutProgram: Array<ApiData>;
};

export const useWorkout = (): UseWorkout => {
    const { workoutProgram, formRoundInfo, setWorkoutProgram, setFormRoundInfo } = useWorkoutContext();
    const { breakLength, roundLength, totalRounds } = formRoundInfo;
    const [currentRound, setCurrentRound] = useState(0);
    const [isBreak, setIsBreak] = useState(true);
    const [seconds, setSeconds] = useState(breakLength);
    const [isPaused, setIsPaused] = useState(false);
    const [isWorkoutOver, setIsWorkoutOver] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(totalRounds * roundLength + totalRounds * breakLength);

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

    useEffect(() => {
        const storageData = localStorage.getItem('storageData');

        if (storageData) {
            const data: StorageData = JSON.parse(storageData);

            if ('isPaused' in data) {
                setIsPaused(data.isPaused);
                setIsBreak(data.isBreak);
                setIsWorkoutOver(data.isWorkoutOver);
                setCurrentRound(data.currentRound);
                setSeconds(data.seconds);
                setTotalSeconds(data.totalSeconds);
                setWorkoutProgram(data.workoutProgram);
                setFormRoundInfo({ ...formRoundInfo, totalRounds: data.totalRounds });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const storageData = {
            isPaused,
            isBreak,
            isWorkoutOver,
            currentRound,
            seconds,
            totalSeconds
        };

        const existingStorage = localStorage.getItem('storageData');

        if (existingStorage) {
            localStorage.setItem('storageData', JSON.stringify({ ...JSON.parse(existingStorage), ...storageData }));
        }
    });

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
        totalSeconds,
        workoutProgram
    };
};
