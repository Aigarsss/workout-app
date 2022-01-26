const types = [
    {
        label: 'No Exercise',
        code: 'noExercise'
    },
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

export const useHome = () => {
    return {
        workoutTypes: types,
        workoutDurations: durations
    };
};
