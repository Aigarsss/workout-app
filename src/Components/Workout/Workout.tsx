import React from 'react';
import { Link } from 'react-router-dom';
import { useWorkout } from './useWorkout';
import classes from './workout.scss';
import { LogOut, Pause, Play } from 'react-feather';
import classnames from 'classnames';
// import moment from 'moment';

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
        <div className={classes.workoutBody}>
            <div className={classes.infoContainer}>
                <div>
                    <span>Round</span>
                    <div className={classes.rounds}>
                        <span>{currentRound + 1} </span>
                        <span>/ {totalRounds}</span>
                    </div>
                </div>
                <div>
                    <span>Total time left</span>
                    <span className={classes.totalTime}>{formattedTime(totalSeconds)}</span>
                </div>
            </div>

            {isBreak && <span className={classes.next}>NEXT</span>}

            <div className={classes.type}>{type}</div>

            <div className={classes.workoutName}>{name}</div>

            <div className={classnames(classes.currentStatus, { [classes.break]: isBreak })}>
                {isBreak ? 'REST' : 'WORK'}
            </div>

            <div className={classes.timeLeft}>{formattedTime(seconds)}</div>

            <div>------------------</div>

            <div className={classes.actionContainer}>
                {isPaused ? (
                    <button onClick={() => resumeTimer()}>
                        <Play />
                        Resume
                    </button>
                ) : (
                    <button onClick={() => pauseTimer()}>
                        <Pause />
                        Pause
                    </button>
                )}
            </div>
        </div>
    );

    const endedWorkoutBody = <div>Workout over</div>;

    return (
        <div className={classes.root}>
            <Link className={classes.link} to="/">
                <LogOut />
                Exit workout
            </Link>
            <div>------------------</div>
            {isWorkoutOver ? endedWorkoutBody : workoutBody}
        </div>
    );
};

export default Workout;
