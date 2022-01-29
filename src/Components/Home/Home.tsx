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
                <select name="roundLength" onChange={handleChange} value={formData.roundLength}>
                    {workoutDurations.map((duration) => (
                        <option value={duration.value} key={duration.value}>
                            {duration.label}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                <p>Break duration</p>
                <select name="breakLength" onChange={handleChange} value={formData.breakLength}>
                    {workoutDurations.map((duration) => (
                        <option value={duration.value} key={duration.value}>
                            {duration.label}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                <p>Total rounds</p>
                <select name="totalRounds" onChange={handleChange} value={formData.totalRounds}>
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
                <div>
                    <input
                        type="checkbox"
                        id="noExercise"
                        name="noExercise"
                        value="noExercise"
                        onChange={handleChange}
                        disabled={
                            formData.abs ||
                            formData.chest ||
                            formData.legs ||
                            formData.shoulders ||
                            formData.triceps ||
                            formData.warmUp
                        }
                    />
                    <label htmlFor="noExercise">No Exercise</label>
                </div>

                {workoutTypes.map((type) => {
                    return (
                        <div key={type.code}>
                            <input
                                type="checkbox"
                                id={type.code}
                                name={type.code}
                                value={type.code}
                                onChange={handleChange}
                                disabled={formData.noExercise}
                                // https://stackoverflow.com/questions/56568423/typescript-no-index-signature-with-a-parameter-of-type-string-was-found-on-ty
                                checked={(formData as any)[type.code]}
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
