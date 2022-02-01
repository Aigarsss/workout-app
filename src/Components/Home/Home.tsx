import React from 'react';
import { useHome } from './useHome';
import { useWorkoutContext } from '@App/Context/workoutContext';
import classes from './home.scss';
import Loader from '@App/Components/Loader';
import Select from '@App/Components/Elements/Select';

const Home: React.FC = () => {
    const { handleRoundInfoChange, handleExerciseChange, formRoundInfo, formExerciseInfo } = useWorkoutContext();
    const { workoutDurations, workoutTypes, isLoading, handleSumbit, workoutRounds } = useHome();

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
                    handleSumbit();
                }}
            >
                <Select
                    label="Total rounds"
                    defaultValue={formRoundInfo.totalRounds}
                    fieldName="totalRounds"
                    items={workoutRounds}
                    onChange={handleRoundInfoChange}
                />

                <div className={classes.durationsContainer}>
                    <Select
                        label="Round"
                        defaultValue={formRoundInfo.roundLength}
                        fieldName="roundLength"
                        items={workoutDurations}
                        onChange={handleRoundInfoChange}
                    />
                    <Select
                        label="Break/Rest"
                        defaultValue={formRoundInfo.breakLength}
                        fieldName="breakLength"
                        items={workoutDurations}
                        onChange={handleRoundInfoChange}
                    />
                </div>

                <div className={classes.exercises}>
                    <span className={classes.exercisesTitle}>Select excercise types</span>
                    <div className={classes.exercisesBody}>
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
                    </div>
                </div>

                <button className={classes.submit} disabled={formExerciseInfo.length === 0}>
                    Start
                </button>
            </form>
        </div>
    );
};

export default Home;
