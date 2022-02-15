import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useWorkout } from './useWorkout';
import classes from './workout.scss';
import { LogOut, Volume2, VolumeX } from 'react-feather';
import classnames from 'classnames';
import ProgressBar, { Color } from '@App/Components/Elements/ProgressBar/ProgressBar';
import Lottie from 'react-lottie';
import lottieDone from './static/lottie-done.json';
import roundEnded from './static/roundEndBell.mp3';
import tick from './static/tenSecondTick.mp3';

const formattedTime = (time: number) => {
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
        isWorkoutOver,
        totalRounds,
        totalSeconds,
        workoutProgram,
        roundPercentage,
        totalPercentage,
        soundMuted,
        setSoundMuted,
        setIsPaused
    } = useWorkout();

    const roundEndedAudio = useMemo(() => {
        return new Audio(roundEnded);
    }, []);

    const tickingAudio = useMemo(() => {
        return new Audio(tick);
    }, []);

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

    const handleSoundClick = () => {
        // Play on user interaction, so that can be played later. Mobile fix
        roundEndedAudio.play();
        roundEndedAudio.pause();
        roundEndedAudio.currentTime = 0;

        tickingAudio.play();
        tickingAudio.pause();
        tickingAudio.currentTime = 0;

        setSoundMuted(!soundMuted);
    };

    const playSound = (sound: string) => {
        // TODO fix double sound on round end. For now its fine, but im not sure what causes the double render.
        if (!soundMuted) {
            if (sound === 'bell') {
                roundEndedAudio.play();
            }

            if (sound === 'tick') {
                tickingAudio.play();
            }
        }
    };

    if (seconds === 0) {
        playSound('bell');
    }

    if (seconds === 10 && !isBreak) {
        playSound('tick');
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

            <div>
                <div className={classnames(classes.currentStatus, { [classes.break]: isBreak })}>
                    {isBreak && currentRound === 0 ? 'GET READY' : isBreak ? 'REST' : 'WORK'}
                </div>
                <div className={classes.timeLeft}>
                    <div className={classes.time} onClick={() => setIsPaused(!isPaused)}>
                        {formattedTime(seconds)}
                    </div>
                    {isPaused && <span className={classes.paused}>Paused</span>}
                </div>
                <ProgressBar width={roundPercentage} color={isBreak ? Color.Orange : Color.Green} />
                <div className={classes.pauseInfo}>Press on timer to {isPaused ? 'resume' : 'pause'}</div>
            </div>

            <div>
                <span className={classes.next}>{isBreak ? 'Get ready for:' : ''}</span>
                <div className={classes.workoutName}>{name}</div>
                <div className={classes.type}>{type}</div>
            </div>
        </div>
    );

    const endedWorkoutBody = (
        <div className={classes.workoutBody}>
            <div className={classes.workoutEnded}>
                <div className={classes.endedTitle}>Nicely done!</div>
                <Link className={classes.endedLink} to="/">
                    <Lottie options={defaultLottieOptions} width="100%" />
                </Link>
            </div>
        </div>
    );

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Link className={classes.link} to="/">
                    <LogOut />
                    Exit workout
                </Link>
                <span className={classes.soundState} onClick={() => handleSoundClick()}>
                    {soundMuted ? <VolumeX /> : <Volume2 />}
                </span>
            </div>
            <ProgressBar width={totalPercentage} />
            {isWorkoutOver ? endedWorkoutBody : workoutBody}
        </div>
    );
};

export default Workout;
