import { useReducer } from 'react';

const DEFAULT_ROUND_LENGTH = 60;
const DEFAULT_BREAK_LENGTH = 15;
const DEFAULT_TOTAL_ROUNDS = 5;

const formReducer = (state: any, event: { name: string; value: boolean | number | string }) => {
    return {
        ...state,
        [event.name]: event.value
    };
};

export const useApp = () => {
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

    const [formData, setFormData] = useReducer(formReducer, defaultState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLSelectElement>) => {
        const isCheckbox = event.target.type === 'checkbox';
        setFormData({
            name: event.target.name,
            value: isCheckbox ? event.target.checked : event.target.value
        });
    };

    return {
        formData,
        handleChange: handleChange
    };
};
