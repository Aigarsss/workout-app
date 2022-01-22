import React, { useEffect, useState } from "react";

const Workout: React.FC = () => {
    const [time, setTime] = useState<number>(0);

    useEffect(()=> {
        const timer = setTimeout(()=> {
            setTime((prevTime)=> prevTime + 1)
        }, 1000)

        return () => {
            clearTimeout(timer);
        }
    }, [time])

    return (
        <div>
            Workouts {time}
        </div>
    )
}

export default Workout;