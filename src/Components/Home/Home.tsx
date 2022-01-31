import React from 'react';
import { useHome } from './useHome';
import { useWorkoutContext } from '@App/Context/workoutContext';
import classes from './home.scss';
import Loader from '@App/Components/Loader';
import Select from '@App/Components/Elements/Select';

const Home: React.FC = () => {
    const { handleRoundInfoChange, handleExerciseChange, formRoundInfo, formExerciseInfo } = useWorkoutContext();
    const { workoutDurations, workoutTypes, isLoading, handleSumbtit, workoutRounds } = useHome();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={classes.root}>
            <span className={classes.title}>
                <span>Workout</span>
                <span>Generator</span>
            </span>

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

                <Select
                    label="Total rounds"
                    defaultValue={formRoundInfo.totalRounds}
                    fieldName="totalRounds"
                    items={workoutRounds}
                    onChange={handleRoundInfoChange}
                />

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
                            <div key={type.value}>
                                <input
                                    type="checkbox"
                                    id={type.value}
                                    name={type.value}
                                    value={type.value}
                                    onChange={handleExerciseChange}
                                    disabled={formExerciseInfo.includes('noExercise')}
                                    checked={formExerciseInfo.includes(type.value)}
                                />
                                <label htmlFor={type.value}>{type.label}</label>
                            </div>
                        );
                    })}
                </fieldset>
                <button disabled={formExerciseInfo.length === 0}>Start</button>
            </form>
        </div>
    );
};

export default Home;
