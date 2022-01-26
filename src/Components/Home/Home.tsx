import React from 'react';
import { useHome } from './useHome';
import { useWorkoutContext } from '@App/Context/workoutContext';

const Home: React.FC = () => {
    const { formData, handleChange } = useWorkoutContext();
    const { workoutDurations, workoutTypes, isLoading, handleSumbtit } = useHome();

    return !isLoading ? (
        <form
            onSubmit={(event: React.SyntheticEvent) => {
                event.preventDefault();
                handleSumbtit();
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
