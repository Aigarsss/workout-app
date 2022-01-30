import { useWorkoutContext } from '@App/Context/workoutContext';
import React from 'react';
import { Link } from 'react-router-dom';
import { useWorkout } from './useWorkout';
import moment from 'moment';
import { Navigate } from 'react-router-dom';

const formattedTime = (time: number) => {
    // const duration = moment.duration(seconds, 'seconds');
    // const min = duration.minutes() < 10 ? `0${duration.minutes()}` : duration.minutes();
    // const sec = duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds();

    const min = Math.floor(time / 60);
    const sec = time % 60;

    const minWithZero = min < 10 ? `0${min}` : min;
    const secWithZero = sec < 10 ? `0${sec}` : sec;

    return `${minWithZero}:${secWithZero}`;
};

const Workout: React.FC = () => {
    const {
        isPaused,
        isBreak,
        currentRound,
        seconds,
        resumeTimer,
        pauseTimer,
        isWorkoutOver,
        totalRounds,
        totalSeconds,
        workoutProgram
    } = useWorkout();

    // Fixes initial empty state or direct access to workout route. Works a bit sketchy, would be good to redo TODO
    if (workoutProgram.length === 0) {
        return <Link to="/">Home</Link>;
    }
    const { name, type } = workoutProgram[currentRound];

    const workoutBody = (
        <div>
            {isPaused ? (
                <button onClick={() => resumeTimer()}>Resume</button>
            ) : (
                <button onClick={() => pauseTimer()}>Pause</button>
            )}
            <div>Time remaining: {formattedTime(totalSeconds)}</div>
            <div>
                Round {currentRound + 1} / {totalRounds}
            </div>
            {isBreak ? <div>REST</div> : <div>WORK</div>}
            <div>Time left: {formattedTime(seconds)}</div>
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
