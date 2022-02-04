import { useWorkoutContext } from '@App/Context/workoutContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiData, mockData } from '@App/MockApi/mockData';

const availableRounds = Array.from(Array(20).keys()).map((key) => {
    const val = Number(key + 1);
    return {
        label: `${val} ${val === 1 ? 'Round' : 'Rounds'}`,
        value: val
    };
});

const types = [
    {
        label: 'Abs',
        value: 'abs'
    },
    {
        label: 'Legs',
        value: 'legs'
    },
    {
        label: 'Chest',
        value: 'chest'
    },
    {
        label: 'Triceps',
        value: 'triceps'
    },
    {
        label: 'Warm Up',
        value: 'warmUp'
    },
    {
        label: 'Shoulders',
        value: 'shoulders'
    }
];

const durations = [
    {
        label: '2s',
        value: '2'
    },
    {
        label: '5s',
        value: '5'
    },
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
    workoutTypes: Array<{ label: string; value: string }>;
    workoutDurations: Array<{ label: string; value: string }>;
    isLoading: boolean;
    handleSumbit: () => void;
    workoutRounds: Array<{ label: string; value: number }>;
};

const getRandomArrayObject = (array: Array<ApiData>): ApiData => {
    return array[Math.floor(Math.random() * array.length)];
};

const shuffleArray = (array: Array<ApiData>) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};

export const useHome = (): UseHome => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { formExerciseInfo, formRoundInfo, setWorkoutProgram } = useWorkoutContext();

    const handleSumbit = () => {
        setIsLoading(true);
        // FAKE API IMPLEMENTATION. TODO REPLACE
        // Initiate final exercise list, that we will put in context for /workout page
        const exerciseList = [];
        let i = 1;
        // Use subcounter to loop the exercises array over and over again
        let subCounter = 0;
        while (i <= formRoundInfo.totalRounds) {
            if (subCounter === formExerciseInfo.length) {
                subCounter = 0;
            }

            // Filter all exercises of specific type and then select one randomly and add to the final list
            const list = mockData.filter(({ type }) => type === formExerciseInfo[subCounter]);

            exerciseList.push(getRandomArrayObject(list));
            subCounter++;
            i++;
        }

        const program = shuffleArray(exerciseList);

        setWorkoutProgram(program);

        const formData = {
            workoutProgram: program,
            // TODO fix round/break length
            formRoundInfo
            // totalRounds: formRoundInfo.totalRounds
        };

        setTimeout(() => {
            setIsLoading(false);
            // Clear storage
            localStorage.removeItem('storageData');
            // Set new storage
            // TODO fix round/break length
            localStorage.setItem('storageData', JSON.stringify(formData));
            navigate('/workout');
        }, 1200);
    };

    return {
        workoutTypes: types,
        workoutDurations: durations,
        workoutRounds: availableRounds,
        isLoading,
        handleSumbit
    };
};
