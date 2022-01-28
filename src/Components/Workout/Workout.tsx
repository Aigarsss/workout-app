import { useWorkoutContext } from '@App/Context/workoutContext';
import React from 'react';
import { Link } from 'react-router-dom';
import { useWorkout } from './useWorkout';
import moment from 'moment';

const Workout: React.FC = () => {
    const { workoutProgram } = useWorkoutContext();
    const { isPaused, isBreak, currentRound, seconds, resumeTimer, pauseTimer, isWorkoutOver, totalRounds } =
        useWorkout();

    const { name, type } = workoutProgram[currentRound];

    const formattedTime = () => {
        const duration = moment.duration(seconds, 'seconds');

        const min = duration.minutes() < 10 ? `0${duration.minutes()}` : duration.minutes();
        const sec = duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds();

        return `${min}:${sec}`;
    };

    const workoutBody = (
        <div>
            {isPaused ? (
                <button onClick={() => resumeTimer()}>Resume</button>
            ) : (
                <button onClick={() => pauseTimer()}>Pause</button>
            )}
            <div>
                Round {currentRound + 1} / {totalRounds}
            </div>
            {isBreak ? <div>REST</div> : <div>WORK</div>}
            <div>Time left: {formattedTime()}</div>
            {isBreak && 'Next Excercise:'}
            <div>
                {name} ({type})
            </div>
        </div>
    );

    const endedWorkoutBody = <div>Workout over</div>;

    return (
        <div>
            <Link to="/">Home</Link>
            {isWorkoutOver ? endedWorkoutBody : workoutBody}
        </div>
    );
};

export default Workout;
