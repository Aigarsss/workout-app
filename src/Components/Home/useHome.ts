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
        label: '2 sec',
        value: '2'
    },
    {
        label: '5 sec',
        value: '5'
    },
    {
        label: '10 sec',
        value: '10'
    },
    {
        label: '15 sec',
        value: '15'
    },
    {
        label: '30 sec',
        value: '30'
    },
    {
        label: '45 sec',
        value: '45'
    },
    {
        label: '1 min',
        value: '60'
    },
    {
        label: '1.5 min',
        value: '90'
    },
    {
        label: '2 min',
        value: '120'
    },
    {
        label: '3 min',
        value: '180'
    },
    {
        label: '4 min',
        value: '240'
    },
    {
        label: '5 min',
        value: '300'
    },
    {
        label: '10 min',
        value: '600'
    },
    {
        label: '20 min',
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
        // setIsLoading(true);
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

            /**
             * Check for duplicates. Only use duplicates if all exercises used up.
             * Works only for the first itteration, but should cover most of the cases
             */

            // Filter out only current type from exercise list
            const alreadyAdded: Array<ApiData> = exerciseList.filter(
                ({ type }) => type === formExerciseInfo[subCounter]
            );

            // Create list of the unique exercises
            const nonDuplicateList: Array<ApiData> = list.filter((cv: ApiData) => {
                return !alreadyAdded.find((e: ApiData) => {
                    return e.name == cv.name;
                });
            });

            // This will work while the duplicate list has entries, once it runs out, it will go to the old behavior
            if (nonDuplicateList.length > 0) {
                exerciseList.push(getRandomArrayObject(nonDuplicateList));
            } else {
                exerciseList.push(getRandomArrayObject(list));
            }

            subCounter++;
            i++;
        }

        const program = shuffleArray(exerciseList);

        setWorkoutProgram(program);

        const formData = {
            workoutProgram: program,
            formRoundInfo
        };

        setTimeout(() => {
            window.scrollTo(0, 0);
            setIsLoading(false);
            // Clear storage
            localStorage.removeItem('storageData');
            // Set new storage
            localStorage.setItem('storageData', JSON.stringify(formData));
            navigate('/workout');
        }, 600);
    };

    return {
        workoutTypes: types,
        workoutDurations: durations,
        workoutRounds: availableRounds,
        isLoading,
        handleSumbit
    };
};
