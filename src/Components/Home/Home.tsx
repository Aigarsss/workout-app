import React from 'react';
import { useHome } from './useHome';
import { useWorkoutContext } from '@App/Context/workoutContext';

const Home: React.FC = () => {
    const { handleRoundInfoChange, handleExerciseChange, formRoundInfo, formExerciseInfo } = useWorkoutContext();
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
                <select name="roundLength" onChange={handleRoundInfoChange} value={formRoundInfo.roundLength}>
                    {workoutDurations.map((duration) => (
                        <option value={duration.value} key={duration.value}>
                            {duration.label}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                <p>Break duration</p>
                <select name="breakLength" onChange={handleRoundInfoChange} value={formRoundInfo.breakLength}>
                    {workoutDurations.map((duration) => (
                        <option value={duration.value} key={duration.value}>
                            {duration.label}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                <p>Total rounds</p>
                <select name="totalRounds" onChange={handleRoundInfoChange} value={formRoundInfo.totalRounds}>
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
                        onChange={handleExerciseChange}
                        disabled={formExerciseInfo.length > 0 && !formExerciseInfo.includes('noExercise')}
                        checked={formExerciseInfo.includes('noExercise')}
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
                                onChange={handleExerciseChange}
                                disabled={formExerciseInfo.includes('noExercise')}
                                checked={formExerciseInfo.includes(type.code)}
                            />
                            <label htmlFor={type.code}>{type.label}</label>
                        </div>
                    );
                })}
            </fieldset>
            <button disabled={formExerciseInfo.length === 0}>Start Workout</button>
        </form>
    ) : (
        <div>loading...</div>
    );
};

export default Home;
