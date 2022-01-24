import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

const formReducer = (state: any, event: { name: string; value: boolean | number | string }) => {
    return {
        ...state,
        [event.name]: event.value
    };
};

const DEFAULT_ROUND_LENGTH = 60;
const DEFAULT_BREAK_LENGTH = 15;
const DEFAULT_TOTAL_ROUNDS = 5;

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

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useReducer(formReducer, defaultState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLSelectElement>) => {
        const isCheckbox = event.target.type === 'checkbox';
        setFormData({
            name: event.target.name,
            value: isCheckbox ? event.target.checked : event.target.value
        });
    };

    console.log(formData);

    return (
        <form
            onSubmit={(event: React.SyntheticEvent) => {
                event.preventDefault();
                // navigate('/workout');
            }}
        >
            <label>
                <p>Round duration</p>
                <select name="roundLength" onChange={handleChange} defaultValue={DEFAULT_ROUND_LENGTH}>
                    {durations.map((duration) => (
                        <option value={duration.value} key={duration.value}>
                            {duration.label}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                <p>Break duration</p>
                <select name="breakLength" onChange={handleChange} defaultValue={DEFAULT_BREAK_LENGTH}>
                    {durations.map((duration) => (
                        <option value={duration.value} key={duration.value}>
                            {duration.label}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                <p>Total rounds</p>
                <select name="totalRounds" onChange={handleChange} defaultValue={DEFAULT_TOTAL_ROUNDS}>
                    {Array.from(Array(20).keys()).map((option) => {
                        const val = option + 1;
                        return (
                            <option value={val} key={val}>
                                {val}
                            </option>
                        );
                    })}
                </select>
            </label>

            <fieldset>
                <legend>Select excercise types</legend>
                {types.map((type) => {
                    return (
                        <div key={type.code}>
                            <input
                                type="checkbox"
                                id={type.code}
                                name={type.code}
                                value={type.code}
                                onChange={handleChange}
                            />
                            <label htmlFor={type.code}>{type.label}</label>
                        </div>
                    );
                })}
            </fieldset>

            <button>Button</button>
        </form>
    );
};

export default Home;
