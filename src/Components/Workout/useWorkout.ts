import { FormRoundInfo } from '@App/Context/useApp';
import { useWorkoutContext } from '@App/Context/workoutContext';
import { ApiData } from '@App/MockApi/mockData';
import { useEffect, useMemo, useState } from 'react';

type UseWorkout = {
    isPaused: boolean;
    setIsPaused: (isPaused: boolean) => void;
    isBreak: boolean;
    currentRound: number;
    seconds: number;
    isWorkoutOver: boolean;
    totalRounds: number;
    totalSeconds: number;
    workoutProgram: Array<ApiData>;
    roundPercentage: number;
    totalPercentage: number;
    soundMuted: boolean;
    setSoundMuted: (soundMuted: boolean) => void;
};

type StorageData = {
    isPaused: boolean;
    isBreak: boolean;
    isWorkoutOver: boolean;
    currentRound: number;
    seconds: number;
    totalSeconds: number;
    workoutProgram: Array<ApiData>;
    formRoundInfo: FormRoundInfo;
    soundMuted: boolean;
};

export const useWorkout = (): UseWorkout => {
    const { workoutProgram, formRoundInfo, setWorkoutProgram, setFormRoundInfo } = useWorkoutContext();
    const { breakLength, roundLength, totalRounds } = formRoundInfo;
    // Here we compensate for the time going down to 0 and showing it. A bit hacky, but works
    const initialTotalTime = totalRounds * roundLength + totalRounds * breakLength + totalRounds * 2 - 1;
    const [currentRound, setCurrentRound] = useState(0);
    const [isBreak, setIsBreak] = useState(true);
    const [seconds, setSeconds] = useState(breakLength);
    const [isPaused, setIsPaused] = useState(false);
    const [isWorkoutOver, setIsWorkoutOver] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(initialTotalTime);
    const [soundMuted, setSoundMuted] = useState(true);

    const intervalCounter = setInterval(() => {
        // Check if timer needs to be stopped
        if (currentRound < totalRounds && !isPaused && !isWorkoutOver) {
            if (seconds >= 1) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (isBreak) {
                    setSeconds(roundLength);
                    setIsBreak(false);
                } else {
                    // If final round, set workout over, else increment round
                    if (currentRound == totalRounds - 1) {
                        setIsWorkoutOver(true);
                    } else {
                        setCurrentRound(currentRound + 1);
                    }
                    setSeconds(breakLength);
                    setIsBreak(true);
                }
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
                setSeconds(Number(data.seconds));
                setTotalSeconds(data.totalSeconds);
                setWorkoutProgram(data.workoutProgram);
                setFormRoundInfo(data.formRoundInfo);
                setSoundMuted(data.soundMuted);
            }
        }
    }, [setFormRoundInfo, setWorkoutProgram]);

    useEffect(() => {
        const storageData = {
            isPaused,
            isBreak,
            isWorkoutOver,
            currentRound,
            seconds,
            totalSeconds,
            soundMuted
        };

        const existingStorage = localStorage.getItem('storageData');

        if (existingStorage) {
            localStorage.setItem('storageData', JSON.stringify({ ...JSON.parse(existingStorage), ...storageData }));
        }
    });

    const roundPercentage = useMemo(() => {
        return isBreak ? (1 - seconds / breakLength) * 100 : (1 - seconds / roundLength) * 100;
    }, [breakLength, isBreak, roundLength, seconds]);

    const totalPercentage = useMemo(() => {
        return (1 - totalSeconds / initialTotalTime) * 100;
    }, [initialTotalTime, totalSeconds]);

    return {
        isPaused,
        setIsPaused,
        isBreak,
        currentRound,
        seconds,
        isWorkoutOver,
        totalRounds,
        totalSeconds,
        workoutProgram,
        roundPercentage,
        totalPercentage: totalPercentage > 100 ? 100 : totalPercentage,
        soundMuted,
        setSoundMuted
    };
};
