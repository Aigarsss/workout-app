import { ApiData } from '@App/MockApi/mockData';
import { useReducer, useState } from 'react';

const DEFAULT_ROUND_LENGTH = 60;
const DEFAULT_BREAK_LENGTH = 15;
const DEFAULT_TOTAL_ROUNDS = 5;

export type UseApp = {
    formData: {
        roundLength: number;
        breakLength: number;
        totalRounds: number;
        noExercise: boolean;
        abs: boolean;
        legs: boolean;
        chest: boolean;
        triceps: boolean;
        warmUp: boolean;
        shoulders: boolean;
    };
    handleChange: (event: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLSelectElement>) => void;
    setWorkoutProgram: any;
    workoutProgram: Array<ApiData>;
};

const formReducer = (state: UseApp['formData'], event: { name: string; value: boolean | number | string }) => {
    return {
        ...state,
        [event.name]: event.value
    };
};

const defaultState = {
    roundLength: DEFAULT_ROUND_LENGTH,
    breakLength: DEFAULT_BREAK_LENGTH,
    totalRounds: DEFAULT_TOTAL_ROUNDS,
    noExercise: false,
    abs: false,
    legs: false,
    chest: false,
    triceps: false,
    warmUp: false,
    shoulders: false
};

export const useApp = () => {
    const [formData, setFormData] = useReducer(formReducer, defaultState);
    const [workoutProgram, setWorkoutProgram] = useState([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLSelectElement>) => {
        const isCheckbox = event.target.type === 'checkbox';
        setFormData({
            name: event.target.name,
            value: isCheckbox ? event.target.checked : event.target.value
        });
    };

    return {
        formData,
        handleChange,
        workoutProgram,
        setWorkoutProgram
    };
};
