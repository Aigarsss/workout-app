import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHome } from './useHome';
import { useWorkoutContext } from '@App/Context/workoutContext';

const DEFAULT_ROUND_LENGTH = 60;
const DEFAULT_BREAK_LENGTH = 15;
const DEFAULT_TOTAL_ROUNDS = 5;

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { formData, handleChange } = useWorkoutContext();
    const [isLoading, setIsLoading] = useState(false);
    const { workoutDurations, workoutTypes } = useHome();

    const handleSumbtit = () => {
        setIsLoading(true);

        // Handle API call to get workout details. set them in state.
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return !isLoading ? (
        <form
            onSubmit={(event: React.SyntheticEvent) => {
                event.preventDefault();

                // Variables to pass to API
                // totalRounds: DEFAULT_TOTAL_ROUNDS
                // exercises[]: ['abs', 'legs']

                console.log(formData);

                handleSumbtit();
                // handle submit, load data into context, redirect to workout
                // navigate('/workout');
            }}
        >
            <label>
                <p>Round duration</p>
                <select name="roundLength" onChange={handleChange} defaultValue={formData.roundLength}>
                    {workoutDurations.map((duration) => (
                        <option value={duration.value} key={duration.value}>
                            {duration.label}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                <p>Break duration</p>
                <select name="breakLength" onChange={handleChange} defaultValue={formData.breakLength}>
                    {workoutDurations.map((duration) => (
                        <option value={duration.value} key={duration.value}>
                            {duration.label}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                <p>Total rounds</p>
                <select name="totalRounds" onChange={handleChange} defaultValue={formData.totalRounds}>
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
                {workoutTypes.map((type) => {
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
    ) : (
        <div>loading...</div>
    );
};

export default Home;
