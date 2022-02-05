import React from 'react';
import { useHome } from './useHome';
import { useWorkoutContext } from '@App/Context/workoutContext';
import classes from './home.scss';
import Loader from '@App/Components/Loader';
import Select from '@App/Components/Elements/Select';
import SelectCheckbox from '@App/Components/Elements/SelectCheckbox';
import { LogIn } from 'react-feather';

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
                <div>
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
                            <SelectCheckbox
                                id="noExercise"
                                label="No Exercise"
                                onChange={handleExerciseChange}
                                checked={formExerciseInfo.includes('noExercise')}
                                disabled={formExerciseInfo.length > 0 && !formExerciseInfo.includes('noExercise')}
                            />

                            {workoutTypes.map((type) => {
                                return (
                                    <SelectCheckbox
                                        key={type.value}
                                        id={type.value}
                                        label={type.label}
                                        onChange={handleExerciseChange}
                                        checked={formExerciseInfo.includes(type.value)}
                                        disabled={formExerciseInfo.includes('noExercise')}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className={classes.action}>
                    <button className={classes.submit} disabled={formExerciseInfo.length === 0}>
                        Start
                        <LogIn />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Home;
