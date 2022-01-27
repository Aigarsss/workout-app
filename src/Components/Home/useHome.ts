import { useWorkoutContext } from '@App/Context/workoutContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockData } from '@App/MockApi/mockData';

const types = [
    {
        label: 'Abs',
        code: 'abs'
    },
    {
        label: 'Legs',
        code: 'legs'
    },
    {
        label: 'Chest',
        code: 'chest'
    },
    {
        label: 'Triceps',
        code: 'triceps'
    },
    {
        label: 'Warm Up',
        code: 'warmUp'
    },
    {
        label: 'Shoulders',
        code: 'shoulders'
    }
];

const durations = [
    {
        label: '10s',
        value: '10'
    },
    {
        label: '15s',
        value: '15'
    },
    {
        label: '30s',
        value: '30'
    },
    {
        label: '45s',
        value: '45'
    },
    {
        label: '1m',
        value: '60'
    },
    {
        label: '1.5m',
        value: '90'
    },
    {
        label: '2m',
        value: '120'
    },
    {
        label: '3m',
        value: '180'
    },
    {
        label: '4m',
        value: '240'
    },
    {
        label: '5m',
        value: '300'
    },
    {
        label: '10m',
        value: '600'
    },
    {
        label: '20m',
        value: '1200'
    }
];

type UseHome = {
    workoutTypes: Array<{ label: string; code: string }>;
    workoutDurations: Array<{ label: string; value: string }>;
    isLoading: boolean;
    handleSumbtit: () => void;
};

const getRandomArray = (arr: Array<any>): string | undefined => {
    return arr[Math.floor(Math.random() * arr.length)];
};

export const useHome = (): UseHome => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { formData, setWorkoutProgram } = useWorkoutContext();

    const handleSumbtit = () => {
        setIsLoading(true);

        // Take all the exercise types from form data and add them to a simple array
        const exercises = Object.entries(formData)
            .filter(([, value]) => value === true)
            .map(([key]) => key);

        // FAKE API IMPLEMENTATION. TODO REPLACE
        // Initiate final exercise list, that we will put in context for /workout page
        const exerciseList = [];

        let i = 1;
        // Use subcounter to loop the exercises array over and over again
        let subCounter = 0;
        while (i <= formData.totalRounds) {
            if (subCounter === exercises.length - 1) {
                subCounter = 0;
            }

            // Filter all exercises of specific type and then select one randomly and add to the final list
            const list = mockData.filter(({ type }) => type === exercises[subCounter]);
            exerciseList.push(getRandomArray(list));
            subCounter++;
            i++;
        }

        setWorkoutProgram(exerciseList);

        setTimeout(() => {
            setIsLoading(false);
            navigate('/workout');
        }, 2000);
    };

    return {
        workoutTypes: types,
        workoutDurations: durations,
        isLoading,
        handleSumbtit
    };
};
