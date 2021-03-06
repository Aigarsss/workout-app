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
import goGoGo from './static/goGoGo.mp3';
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
        setSeconds,
        isWorkoutOver,
        totalRounds,
        totalSeconds,
        setTotalSeconds,
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

    const goGoAudio = useMemo(() => {
        return new Audio(goGoGo);
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

        goGoAudio.play();
        goGoAudio.pause();
        goGoAudio.currentTime = 0;

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

            if (sound === 'goGo') {
                goGoAudio.play();
            }
        }
    };

    if (seconds === 0 && !isBreak) {
        playSound('bell');
    }

    if (seconds === 0 && isBreak) {
        playSound('goGo');
    }

    if (seconds === 10 && !isBreak) {
        playSound('tick');
    }

    const pauseInfoDiv = document.getElementById('pauseInfo');
    // Fade out pausing info.
    setTimeout(() => {
        pauseInfoDiv && (pauseInfoDiv.style.opacity = '0');
    }, seconds * 1000);

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
                <div id="pauseInfo" className={classes.pauseInfo}>
                    Press on timer to {isPaused ? 'resume' : 'pause'}
                </div>
            </div>

            <div>
                <div className={classes.next}>{isBreak ? 'Get ready for:' : ''}</div>
                <div className={classes.workoutName}>{name}</div>
                <div className={classes.type}>{type}</div>
                <div
                    className={classes.skip}
                    onClick={() => {
                        setSeconds(0);
                        setTotalSeconds(totalSeconds - seconds);
                    }}
                >
                    Skip
                </div>
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
