import { ApiData } from '@App/MockApi/mockData';
import { useState } from 'react';

const DEFAULT_ROUND_LENGTH = 60;
const DEFAULT_BREAK_LENGTH = 15;
const DEFAULT_TOTAL_ROUNDS = 5;

type FormRoundInfo = {
    roundLength: number;
    breakLength: number;
    totalRounds: number;
};

type FormExerciseInfo = Array<string>;

export type UseApp = {
    formRoundInfo: FormRoundInfo;
    formExerciseInfo: FormExerciseInfo;
    setWorkoutProgram: (workoutProgram: Array<ApiData>) => void;
    workoutProgram: Array<ApiData>;
    handleRoundInfoChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleExerciseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const defaultRoundInfo = {
    roundLength: DEFAULT_ROUND_LENGTH,
    breakLength: DEFAULT_BREAK_LENGTH,
    totalRounds: DEFAULT_TOTAL_ROUNDS
};

export const useApp = () => {
    const [workoutProgram, setWorkoutProgram] = useState<Array<ApiData>>([]);
    const [formRoundInfo, setFormRoundInfo] = useState<FormRoundInfo>(defaultRoundInfo);
    const [formExerciseInfo, setFormExerciseInfo] = useState<FormExerciseInfo>([]);

    // For inputs
    const handleRoundInfoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormRoundInfo((prevVal) => {
            return { ...prevVal, [name]: value };
        });
    };

    // For checkboxes
    const handleExerciseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        const name = event.target.name;

        if (isChecked) {
            if (!formExerciseInfo.includes(name)) {
                setFormExerciseInfo([...formExerciseInfo, name]);
            }
        } else {
            if (formExerciseInfo.includes(name)) {
                const newList = formExerciseInfo.filter((item) => item !== name);
                setFormExerciseInfo(newList);
            }
        }
    };

    return {
        formRoundInfo,
        formExerciseInfo,
        workoutProgram,
        setWorkoutProgram,
        handleRoundInfoChange,
        handleExerciseChange
    };
};
