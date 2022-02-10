import React from 'react';
import { Link } from 'react-router-dom';
import { useWorkout } from './useWorkout';
import classes from './workout.scss';
import { LogOut, Pause, Play } from 'react-feather';
import classnames from 'classnames';
import ProgressBar, { Color } from '@App/Components/Elements/ProgressBar/ProgressBar';
import Lottie from 'react-lottie';
import lottieDone from './static/lottie-done.json';
import roundEnded from './static/roundEndBell.mp3';
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

const defaultLottieOptions = {
    loop: false,
    autoplay: true,
    animationData: lottieDone,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
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
        workoutProgram,
        roundPercentage,
        totalPercentage
    } = useWorkout();

    // TODO Fixes initial empty state or direct access to workout route. Works a bit sketchy, would be good to redo
    if (workoutProgram.length === 0) {
        return (
            <div className={classes.root}>
                <Link className={classes.link} to="/">
                    Home
                </Link>
            </div>
        );
    }
    const { name, type } = workoutProgram[currentRound];
    const audio = new Audio(roundEnded);

    const toggleRoundEndSound = () => {
        audio.play();
    };

    console.log(!isBreak && seconds == 0);

    if (!isBreak && seconds == 0) {
        // toggleRoundEndSound();
    }

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
            <span className={classes.next}>{isBreak ? 'NEXT' : ''}</span>
            <div className={classes.type}>{type}</div>
            <div className={classes.workoutName}>{name}</div>
            <div className={classnames(classes.currentStatus, { [classes.break]: isBreak })}>
                {isBreak && currentRound === 0 ? 'GET READY' : isBreak ? 'REST' : 'WORK'}
            </div>
            <div className={classes.timeLeft}>
                <div className={classes.time}>{formattedTime(seconds)}</div>
                <div className={classes.actionContainer}>
                    {isPaused ? (
                        <button onClick={() => resumeTimer()}>
                            <Play />
                        </button>
                    ) : (
                        <button onClick={() => pauseTimer()}>
                            <Pause />
                        </button>
                    )}
                </div>
            </div>
            <ProgressBar width={roundPercentage} color={isBreak ? Color.Orange : Color.Green} />
        </div>
    );

    const endedWorkoutBody = (
        <div className={classes.workoutEnded}>
            <div className={classes.endedTitle}>Nicely done!</div>
            <Link className={classes.endedLink} to="/">
                <Lottie options={defaultLottieOptions} width="100%" />
            </Link>
        </div>
    );

    return (
        <div className={classes.root}>
            <Link className={classes.link} to="/">
                <LogOut />
                Exit workout
            </Link>
            <ProgressBar width={totalPercentage} />
            {isWorkoutOver ? endedWorkoutBody : workoutBody}
        </div>
    );
};

export default Workout;
