import React from 'react';
import { Link } from 'react-router-dom';
import { useWorkout } from './useWorkout';

const Workout: React.FC = () => {
    const { isPaused, isBreak, currentRound, seconds, resumeTimer, pauseTimer, isWorkoutOver, totalRounds } =
        useWorkout();

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
            <div>Time left: {seconds} seconds</div>
            {isBreak && 'Next Excercise:'}
            <div>Exercise name</div>
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
